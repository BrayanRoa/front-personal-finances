import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../shared/service/base-service.service';
import { ApiResponse, CommonResponse } from '../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';

@Injectable({ providedIn: 'root' })
export class WalletService extends BaseService {

    endpoint: string = `${this.baseUrl}/wallet`;

    constructor(private httpClient: HttpClient) {
        super();
    }

    getBanksInformation(): Observable<ApiResponse<BanksInformation[]>> {
        return this.httpClient.get<ApiResponse<BanksInformation[]>>(`${this.endpoint}/`, { headers: this.getHeaders() });
    }

    createBank(wallet: BanksInformation): Observable<CommonResponse> {
        return this.httpClient.post<CommonResponse>(`${this.endpoint}/`,  wallet , { headers: this.getHeaders() });
    }

}