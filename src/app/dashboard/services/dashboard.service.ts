import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionResponse } from '../interfaces/transactions/getAll.interface';
import { BaseService } from '../../shared/service/base-service.service';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
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
    }): Observable<TransactionResponse> {
        const params = this.buildParams({
            walletId: options.walletId,
            page: options.page,
            per_page: options.per_page,
            month: options.month,
            year: options.year,
            search: options.searchTerm
        });

        const fullUrl = `${this.endpoint}`;
        console.log('Request URL:', fullUrl);

        return this.http.get<TransactionResponse>(fullUrl, {
            params,
            headers: this.getHeaders()
        });
    }
}
