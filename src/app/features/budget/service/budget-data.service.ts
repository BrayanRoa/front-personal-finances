import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/service/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetData } from '../interfaces/budget.interface';
import { ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';

@Injectable({ providedIn: 'root' })
export class BudgetDataService extends BaseService {

    endpoint: string = `${this.baseUrl}/budget`;

    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    getAll(): Observable<ApiResponse<BudgetData[]>> {
        return this.http.get<ApiResponse<BudgetData[]>>(this.endpoint);
    }

    getOne(id: number): Observable<ApiResponse<BudgetData>> {
        return this.http.get<ApiResponse<BudgetData>>(`${this.endpoint}/${id}`);
    }

    getTransactionsByBudget(categories: number[], start: string, end: string): Observable<ApiResponse<TransactionData>> {
        return this.http.get<ApiResponse<TransactionData>>(`${this.endpoint}/transactions?categories=${categories}&start=${start}&end=${end}`)
    }

    save(data: BudgetData): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(`${this.endpoint}`, data)
    }

    update(id: number, data: BudgetData): Observable<CommonResponse> {
        return this.http.patch<CommonResponse>(`${this.endpoint}/${id}`, data)
    }

}