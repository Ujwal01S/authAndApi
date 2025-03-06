import { getUserSession } from "@/app/api/auth/[...nextauth]/option";
import { Session } from "next-auth";
import { CacheOption, fetchWrapper } from "./requestHandler";
import { getSession } from "next-auth/react";
import { goTry } from 'go-go-try'
import { revalidatePath, revalidateTag } from "next/cache";
import { ErrorResponse, handleErrorResponse, handleSuccessResponse, SuccessResponse } from "@/lib/requestHandler";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface HandleServerActionOptions<ResponseType, RequestType> {
    endpoint: string;
    method: "POST" | "PATCH" | "DELETE" | "PUT" | "GET";
    successMessage?: string;
    revalidateUrl?: string;
    data?: RequestType;
    revalidateTagName?: string;
    isProtected?: boolean;
}

export interface ISessionService {
    getUserSession(): Promise<Session | null>
}

class SessionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SessionError";
    }
}


export class SessionService implements ISessionService {
    async getUserSession(): Promise<Session | null> {
        return await getUserSession()
    }
}

export abstract class BaseApi {
    constructor(private readonly sessionService?: ISessionService) { }

    public async getAuthenticatedSession(): Promise<Session | null> {
        if (!this.sessionService) {
            return null
        }
        return await this.sessionService.getUserSession()
    }

    protected async handleClientQuery<k>({ query, param, cache, tags, isProtected = false }: {
        query: string;
        param?: string;
        cache?: CacheOption;
        tags?: string[];
        isProtected?: boolean
    }) {
        let session: Session | null = null;
        if (isProtected) {
            session = await getSession();
            if (!session) {
                throw new SessionError("Session not found")
            }
        }
        const [error, respose] = await goTry(
            fetchWrapper<k>(`${query}${param ? param : ""}`, {
                method: "GET",
                cache: cache,
                session: session,
                tags,
                type: "client",
                validateStatus: (status: number) => status >= 200 && status < 300
            })
        )

        if (error) {
            throw error
        }

        return respose?.data;

    }

    protected async handleClientAction<ResponseType, RequestType>(options: HandleServerActionOptions<ResponseType, RequestType>): Promise<SuccessResponse | ErrorResponse> {
        const { endpoint, method, data, revalidateTagName, revalidateUrl, successMessage } = options


        try {
            const res = await fetchWrapper<ResponseType, RequestType>(endpoint, {
                method: method,
                body: data,
                validateStatus: (status: number) => status >= 200 && status < 300,
                cache: "no-store",
                type: "client"
            })
            if (revalidateUrl) {
                revalidatePath(revalidateUrl)
            }
            if (revalidateTagName) {
                revalidateTag(revalidateTagName)
            }

            return handleSuccessResponse(res, successMessage ?? "Action Successfull")
        } catch (err) {
            console.error("ClientAction Error: ", err);
            return handleErrorResponse(err);
        }
    }

    protected async handleServerQuery<k>({ query, param, cache, tags, isProtected = false, headers }: {
        query: string;
        param?: string;
        cache?: CacheOption;
        tags?: string[];
        isProtected?: boolean;
        headers?: Record<string, string>
    }) {
        let session: Session | null = null;
        console.log(`Request to: ${query}`);
        if (isProtected) {
            session = await this.getAuthenticatedSession();
            if (!session) {
                throw new SessionError("Session not found")
            }
        }
        const res = await fetchWrapper<k>(`${query}${param ? param : ""}`, {
            method: "GET",
            cache: cache,
            tags,
            session: session,
            validateStatus: (status: number) => status >= 200 && status < 300,
            type: "server",
            headers: headers
        })

        return {
            res
        }

    }
}