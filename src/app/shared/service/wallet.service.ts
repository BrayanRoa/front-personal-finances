import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/common-response.interface';
import { BanksInformation } from '../interfaces/wallet/wallet.interface';

@Injectable({ providedIn: 'root' })
export class WalletService extends BaseService {

    endpoint: string = `${this.baseUrl}/wallet`;

    constructor(private httpClient: HttpClient) {
        super();
    }

    banksInformation(): Observable<ApiResponse<BanksInformation[]>> {
        return this.httpClient.get<ApiResponse<BanksInformation[]>>(`${this.endpoint}/`, { headers: this.getHeaders() });
    }

}