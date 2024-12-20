import { Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet.service';
import { IMonthlyBalanceByWallet, WalletData, WalletIncomesAndExpenses, WalletPercentages } from '../interfaces/wallet.interface';
import { NOT_FOUND_MSG } from '../../../shared/constants/constants';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { confirmDelete } from '../../../shared/components/sweet-alert-modal/sweet-alert-modal';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent extends BaseComponent implements OnInit {

  walletsData: WalletData[] = []
  percentages: WalletPercentages[] = []
  incomesAndExpensesByWallet: WalletIncomesAndExpenses[] = []
  monthlyBalanceData: IMonthlyBalanceByWallet | null = null;
  msgNotFound = NOT_FOUND_MSG

  constructor(
    private walletService: WalletService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.getWallets();
    this.getIncomesAndExpenses();
    this.monthlyBalance();
  }

  getWallets() {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        this.walletsData = response.data;
        this.calculatePercentages()
      },
      error: (error) => console.error('Error fetching wallets', error)
    });
  }

  private calculatePercentages() {
    let total = 0
    this.walletsData.forEach((wallet) => {
      total += wallet.balance
    })
    this.percentages = this.walletsData.map(bank => {
      return {
        name: bank.name,
        percentage: Math.round((bank.balance / total) * 100)
      }
    })
  }

  monthlyBalance() {
    this.walletService.getMonthlyBalanceByWallet().subscribe({
      next: (response) => {
        this.monthlyBalanceData = response.data;
      },
      error: (error) => console.error('Error fetching monthly balance', error)
    });
  }
  getIncomesAndExpenses() {
    this.walletService.getIncomesAndExpenses().subscribe({
      next: (response) => {
        this.incomesAndExpensesByWallet = response.data
      },
      error: (error) => console.error('Error fetching incomes and expenses', error)
    });
  }

  updateWallet(event: { id: number, data: WalletData }) {
    this.walletService.updateWallet(event.id, event.data).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.refreshData()
      },
      error: (error) => console.error('Error updating wallet', error)
    })
  }

  deleteWallet(row: number) {
    confirmDelete().then((isConfirmed) => {
      if (isConfirmed) {
        this.walletService.deleteWallet(row).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.refreshData()
          },
          error: (error) => console.error('Error deleting wallet', error)
        })
      }
    })
  }

  refreshData() {
    this.calculatePercentages();
    this.getIncomesAndExpenses();
    this.getWallets()
    this.monthlyBalance();
  }

}
