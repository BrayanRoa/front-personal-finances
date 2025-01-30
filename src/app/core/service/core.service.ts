import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../shared/service/base-service.service';
import { ApiResponse, CommonResponse } from '../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';
import { CategoryInterface } from '../../shared/interfaces/category/category.interface';
import { ICategory } from '../../features/categories/interface/category.interface';

@Injectable({ providedIn: 'root' })
export class CoreService extends BaseService {

    walletEndpoint: string = `${this.baseUrl}/wallet`;
    categoryEndpoint: string = `${this.baseUrl}/category`

    constructor(private httpClient: HttpClient) {
        super();
    }

    getBanksInformation(): Observable<ApiResponse<BanksInformation[]>> {
        return this.httpClient.get<ApiResponse<BanksInformation[]>>(`${this.walletEndpoint}/`, { headers: this.getHeaders() });
    }

    createBank(wallet: BanksInformation): Observable<CommonResponse> {
        return this.httpClient.post<CommonResponse>(`${this.walletEndpoint}/`, wallet, { headers: this.getHeaders() });
    }

    getCategories(): Observable<ApiResponse<ICategory[]>> {
        return this.httpClient.get<ApiResponse<ICategory[]>>(`${this.categoryEndpoint}/`, { headers: this.getHeaders() });
    }

}