export interface SuccessResponse {
    success: true;
    status?: number;
    message?: string; // Optional success message
    data?: any;
}

export interface ErrorResponse {
    success: false;
    status: number;
    message?: string; // Optional error message
    errors?: any;
}

export function handleErrorResponse(error: any): ErrorResponse {
    if (error) {
        return {
            success: false,
            status: error.status || 500,
            errors: error.errorData,
            message: error.message,
        };
    }
    return {
        success: false,
        status: 500, // Default fallback status
        errors: [
            {
                message: "An error occurred",
            },
        ],
    };
}

export function handleCustomErrorResponse(
    status: number,
    errorData: any,
): ErrorResponse {
    return {
        success: false,
        status: status,
        errors: errorData,
    };
}

export function handleSuccessResponse<T>(
    response: any,
    message: string,
): SuccessResponse {
    return {
        success: true,
        status: response.status,
        message: message,
        data: response.data as T,
    };
}
