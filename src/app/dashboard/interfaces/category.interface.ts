import { CommonResponse } from "./common-response.interface";

export interface CategoryCountResponse extends CommonResponse {
    data: CategoryCountData[];
}

export interface CategoryCountData {
    name: string;
    transactionCount: number;
}