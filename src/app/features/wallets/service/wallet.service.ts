import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/service/base-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../shared/interfaces/common-response.interface';
import { IMonthlyBalanceByWallet, WalletData, WalletIncomesAndExpenses } from '../interfaces/wallet.interface';

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

  getMonthlyBalanceByWallet(): Observable<ApiResponse<IMonthlyBalanceByWallet>> {
    return this.http.get<ApiResponse<IMonthlyBalanceByWallet>>(`${this.endpoint}/montly-balance-wallet/${2024}`)
  }
}
