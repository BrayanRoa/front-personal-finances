export interface ApiResponse<T> {
    status: number;
    statusMsg: string;
    data: T
}

export interface MetaData {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    next_page: boolean;
}

export interface CommonResponseCreate {
    status: number;
    statusMsg: string;
    data:string
}