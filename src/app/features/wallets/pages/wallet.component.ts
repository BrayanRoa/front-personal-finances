import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet.service';
import { IMonthlyBalanceByWallet, WalletData, WalletIncomesAndExpenses, WalletPercentages } from '../interfaces/wallet.interface';
import { walletsData } from '../../transactions/resolvers/transactions.resolver';
import { NOT_FOUND_MSG } from '../../../shared/constants/constants';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

  walletsData: WalletData[] = []
  percentages: WalletPercentages[] = []
  incomesAndExpensesByWallet: WalletIncomesAndExpenses[] = []
  monthlyBalanceData: IMonthlyBalanceByWallet | null = null;
  msgNotFound = NOT_FOUND_MSG

  constructor(
    private walletService: WalletService,
    private cd: ChangeDetectorRef
  ) { }

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
        console.log(this.monthlyBalanceData);
        this.cd.detectChanges();
        // console.log("Monthly Balance", response.data);
      },
      error: (error) => console.error('Error fetching monthly balance', error)
    });
  }
  getIncomesAndExpenses() {
    this.walletService.getIncomesAndExpenses().subscribe({
      next: (response) => {
        this.incomesAndExpensesByWallet = response.data
        console.log("AJA", this.incomesAndExpensesByWallet);
      },
      error: (error) => console.error('Error fetching incomes and expenses', error)
    });
  }

}
