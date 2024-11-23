import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../../shared/service/base-service.service';
import { ApiResponse } from '../../../shared/interfaces/common-response.interface';
import { budgetInformation, graphPolarity, graphVerticalData, summaryWalletsResponse } from '../../../shared/interfaces/dashboard/summary-wallets.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {

    endpoint: string = `${this.baseUrl}/dashboard`;

    constructor(public http: HttpClient) {
        super();
    }

    summaryWallets(): Observable<ApiResponse<summaryWalletsResponse>> {
        return this.http.get<ApiResponse<summaryWalletsResponse>>(`${this.endpoint}/summary-wallets`,
            { headers: this.getHeaders() }
        );
    }

    graphVertical(year: string): Observable<ApiResponse<graphVerticalData[]>> {
        return this.http.get<ApiResponse<graphVerticalData[]>>(`${this.endpoint}/summary-transaction-month/${year}`,
            { headers: this.getHeaders() }
        );
    }

    graphPolarity(): Observable<ApiResponse<graphPolarity[]>> {
        return this.http.get<ApiResponse<graphPolarity[]>>(`${this.endpoint}/summary-category-transaction`,
            { headers: this.getHeaders() }
        )
    }

    budgetInformation(page: number, per_page: number): Observable<ApiResponse<budgetInformation>> {
        return this.http.get<ApiResponse<budgetInformation>>(`${this.endpoint}/summary-budget-information?page=${page}&per_page=${per_page}`,
            { headers: this.getHeaders() }
        )
    }
}
