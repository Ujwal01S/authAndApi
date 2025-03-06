export interface SuccessGetResponse<T> {
    statusCode: number;
    message: string;
    _metadata: any;
    data: T;
}

export interface SuccessPaginatedGetResponse<T> {
    statusCode: number;
    message: string;
    _metadata: any;
    data: T[];
    _pagination: Pagination;
}

interface Pagination {
    totalPage: number;
    total: number;
    limit: number;
    page: number;
    nextPage: number | null;
    prevPage: number | null;
}
