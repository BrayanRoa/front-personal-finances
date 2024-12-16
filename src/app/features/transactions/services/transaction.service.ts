import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/service/base-service.service';
import { Observable } from 'rxjs';
import { ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';
import { LoadTransactionParams } from '../page/transactions.component';

@Injectable({ providedIn: 'root' })
export class TransactionService extends BaseService {

    endpoint: string = `${this.baseUrl}/transaction`;

    constructor(public http: HttpClient) {
        super();
    }

    getTransactions(options: LoadTransactionParams): Observable<ApiResponse<TransactionData>> {

        const query = new URLSearchParams({
            walletIds: JSON.stringify(
                options.walletIds && options.walletIds.length > 0 ? options.walletIds : null
            ),
            categoryIds: JSON.stringify(
                options.categoryIds && options.categoryIds.length > 0 ? options.categoryIds : null),
            repeats: JSON.stringify(
                options.repeats && options.repeats.length > 0 ? options.repeats : null
            ),
            types: JSON.stringify(
                options.types && options.types.length > 0 ? options.types : null
            ),
            months: JSON.stringify(
                options.months && options.months.length > 0 ? options.months : null
            ),
            years: JSON.stringify(options.years ? options.years : new Date().getUTCFullYear()),
            page: options.page!.toString(),
            per_page: options.per_page.toString(),
            search: options.searchTerm || '',
        }).toString()
        const fullUrl = `${this.endpoint}`;

        return this.http.get<ApiResponse<TransactionData>>(`${fullUrl}?${query}`, {
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