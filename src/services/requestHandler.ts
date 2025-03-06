import { Session } from "next-auth";


type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type CacheOption =
    | "no-store"
    | "default"
    | "reload"
    | "no-cache"
    | "force-cache";

interface RequestOptions<TRequestBody> {
    method: HttpMethod;
    session?: Session | null;
    body?: TRequestBody;
    headers?: Record<string, string>;
    tags?: string[];
    cache?: CacheOption;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    type: "server" | "client";
    validateStatus: (status: number) => boolean;
}

interface RequestResponse<TResponse> {
    success: boolean;
    data?: TResponse;
    status?: number;
    headers?: Headers;
    error?: Error;
}

export class HTTPError extends Error {
    public status: number;
    constructor(
        public readonly response: Response,
        public readonly errorData: any,
    ) {
        super(
            errorData.message || response.statusText || `HTTP error! status: ${response.status}`
        );
        this.name = "HTTPError";
        this.status = response.status;
        this.errorData = errorData.error
    }
}

const defaultOptions: Partial<RequestOptions<any>> = {
    method: "GET",
    cache: "no-store",
    timeout: 20000,
    retries: 0,
    retryDelay: 1000,
    validateStatus: (status: number) => status >= 200 && status < 300,
};

async function sleep(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchWrapper<TResponse = unknown, TRequestBody = unknown>(
    url: string, options: RequestOptions<TRequestBody>
): Promise<RequestResponse<TResponse>> {
    const fullOptions = { ...defaultOptions, ...options };
    const {
        method, validateStatus, body, cache, headers: customHeaders, retries, retryDelay, tags, timeout
    } = fullOptions;

    const headers = new Headers(customHeaders);

    if (body && !(body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
    }

    // if(session?.user.accessToken){
    //     headers.set("Authorization", `Bearer ${session.user.accessToken}`)
    // }

    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const fullUrl = new URL(url, apiUrl);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => { controller.abort(); console.log('TimeOut'); }, timeout);
    // if the request takes longer time than given time out the abort method from constructor AbortController is triggered that cancels the fetch

    const fetchWithRetry = async (attemptsLeft: number): Promise<RequestResponse<TResponse>> => {
        try {
            // console.log("fullURL:", fullUrl);
            const response = await fetch(fullUrl.toString(), {
                method,
                headers,
                body: body ? body instanceof FormData ? body : JSON.stringify(body) : undefined,
                cache: cache,
                next: { tags },
                signal: controller.signal
            })

            if (!validateStatus(response.status)) {
                const errorData = await response.json().catch(() => ({}));
                throw new HTTPError(response, errorData)
            }

            if (response.status === 204) {
                return {
                    success: true,
                    status: response.status,
                    headers: response.headers
                }
            }
            const contentType = response.headers.get("Content-Type");
            const data = contentType?.includes("application/json") ? await response.json().catch(() => ({})) : await response.text()

            return {
                success: true,
                data: data as TResponse,
                status: response.status,
                headers: response.headers
            }
        } catch (error: any) {
            if (attemptsLeft > 0 && !(error instanceof HTTPError && error.status >= 400 && error.status <= 500) && error.name != "AbortError") {
                console.warn(`Request  failed, retrying...(${attemptsLeft} attempts left)`)
                await sleep(retryDelay ?? defaultOptions.retryDelay);
                await fetchWithRetry(attemptsLeft - 1)
            }
            throw error
        } finally {
            clearTimeout(timeoutId)
        }
    };

    try {
        return await fetchWithRetry(retries ?? defaultOptions.retries ?? 0)
    } catch (error) {
        if (error instanceof HTTPError) {
            console.log("HTTP Error", error.message, error.errorData);
            throw error
        } else {
            throw error;
        }
    }
}
