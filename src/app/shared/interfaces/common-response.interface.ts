export interface CommonResponse {
    status: number;
    statusMsg: string;
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