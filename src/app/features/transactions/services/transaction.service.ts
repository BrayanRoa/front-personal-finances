import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/service/base-service.service';
import { Observable } from 'rxjs';
import { ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';

@Injectable({ providedIn: 'root' })
export class TransactionService extends BaseService {

    endpoint: string = `${this.baseUrl}/transaction`;

    constructor(public http: HttpClient) {
        super();
    }

    getTransactions(options: {
        walletId: number;
        page: number;
        per_page: number;
        searchTerm?: string;
        month: number;
        year: number;
    }): Observable<ApiResponse<TransactionData>> {
        const params = this.buildParams({
            walletId: options.walletId,
            page: options.page,
            per_page: options.per_page,
            month: options.month,
            year: options.year,
            search: options.searchTerm
        });

        const fullUrl = `${this.endpoint}`;
        // console.log('Request URL:', fullUrl);

        return this.http.get<ApiResponse<TransactionData>>(fullUrl, {
            params,
        });

    }

    getYears(): Observable<ApiResponse<number[]>> {
        return this.http.get<ApiResponse<number[]>>(`${this.endpoint}/get-years`, { headers: this.getHeaders() });
    }

    deleteTransaction(id: number | string): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(`${this.endpoint}/${id}`, { headers: this.getHeaders() });
    }

    createTransaction(transaction: Transaction): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(`${this.endpoint}`, transaction, { headers: this.getHeaders() });
    }

    updateTransaction(id: number, transaction: Transaction): Observable<CommonResponse> {
        return this.http.patch<CommonResponse>(`${this.endpoint}/${id}`, transaction, { headers: this.getHeaders() });
    }
}