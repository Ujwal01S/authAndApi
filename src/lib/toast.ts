import { toast } from "sonner";


export interface ErrorResponse {
    success: false;
    status: number;
    message?: string;
}


export function showSuccessToast(message: string | undefined) {
    toast.success(message || "Action Successfull")
}


export function showErrorToast(response: string | undefined) {
    toast.error(response || "Action failed")
}