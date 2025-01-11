import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/service/base-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { IMonthlyBalanceByWallet, WalletData, WalletIncomesAndExpenses } from '../interfaces/wallet.interface';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends BaseService {

  endpoint: string = `${this.baseUrl}/wallet`;

  constructor(private http: HttpClient) {
    super();
  }

  getWallets(): Observable<ApiResponse<WalletData[]>> {
    return this.http.get<ApiResponse<WalletData[]>>(this.endpoint)
  }

  // incomes and expenses by wallet
  getIncomesAndExpenses(): Observable<ApiResponse<WalletIncomesAndExpenses[]>> {
    return this.http.get<ApiResponse<WalletIncomesAndExpenses[]>>(`${this.endpoint}/incomes-expenses-by-wallet`)
  }

  getMonthlyBalanceByWallet(year:number): Observable<ApiResponse<IMonthlyBalanceByWallet>> {
    return this.http.get<ApiResponse<IMonthlyBalanceByWallet>>(`${this.endpoint}/montly-balance-wallet/${year}`)
  }

  updateWallet(id: number, wallet: WalletData): Observable<CommonResponse> {
    return this.http.patch<CommonResponse>(`${this.endpoint}/${id}`, wallet)
  }

  deleteWallet(id: number): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(`${this.endpoint}/${id}`)
  }

  createWallet(wallet: BanksInformation) {
    return this.http.post<CommonResponse>(`${this.endpoint}/`, wallet);
  }
}
