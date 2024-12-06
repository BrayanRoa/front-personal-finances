import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { summaryWalletsResponse } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnChanges {

  // @Input() transactions: Transaction[] = [];

  @Input() walletSummary: summaryWalletsResponse = {
    totalIncome: 0,
    totalExpenses: 0,
    budgetsActives: 0,
    totalTransactions: 0
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["walletSummary"] && changes["walletSummary"].currentValue) {

    }
  }

  

// new Chart(document.getElementById('chart'), config);


}
