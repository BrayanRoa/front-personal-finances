import { Component, OnInit } from '@angular/core';
import { WalletService } from '../service/wallet.service';
import { WalletData, WalletIncomesAndExpenses, WalletPercentages } from '../interfaces/wallet.interface';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

  walletsData: WalletData[] = []
  percentages: WalletPercentages[] = []
  incomesAndExpensesByWallet: WalletIncomesAndExpenses[] = []

  constructor(
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.getWallets();
    this.getIncomesAndExpenses();
  }

  getWallets() {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        this.walletsData = response.data;
        console.log("TEST",this.walletsData);
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
      },
      error: (error) => console.error('Error fetching wallets', error)
    });
  }

  getIncomesAndExpenses() {
    this.walletService.getIncomesAndExpenses().subscribe({
      next: (response) => {
        this.incomesAndExpensesByWallet = response.data
        console.log("AJA",this.incomesAndExpensesByWallet);
      },
      error: (error) => console.error('Error fetching incomes and expenses', error)
    });
  }

}
