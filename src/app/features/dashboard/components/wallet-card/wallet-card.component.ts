import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { summaryWalletsResponse } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';


export interface SummaryInterface {
  id: string;
  title: string;
  icon: string;
  value: number;
  cardImg: string;
  idTitle: string;
  idValue: string;
  useCurrency: boolean
}
@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnInit, OnChanges {

  @Input() walletSummary: summaryWalletsResponse = {
    totalIncome: 0,
    totalExpenses: 0,
    budgetsActives: 0,
    totalTransactions: 0
  };

  cardsInfo: SummaryInterface[] = [
    {
      id: "totalIncome",
      title: "Total Incomes",
      icon: "pi pi-money-bill",
      value: 0,
      cardImg: 'total-incomes',
      idTitle: 'title-one',
      idValue: 'amount-one',
      useCurrency: true
    },
    {
      id: "totalExpenses",
      title: "Total Expenses",
      icon: "pi pi-shop",
      value: 0,
      cardImg: 'total-expenses',
      idTitle: 'title-two',
      idValue: 'amount-two',
      useCurrency: true
    },
    {
      id: "budgetsActives",
      title: "Budgets Actives",
      icon: "pi pi-wallet",
      value: 0,
      cardImg: 'budgets',
      idTitle: 'title-three',
      idValue: 'amount-three',
      useCurrency: false
    },
    // {
    //   id: "totalTransactions",
    //   title: "Total Transactions",
    //   icon: "pi pi-calendar-clock",
    //   value: 0,
    //   cardImg: 'total-transactions',
    //   idTitle: 'title-four',
    //   idValue: 'amount-four',
    //   useCurrency: false
    // }
  ]

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["walletSummary"] && changes["walletSummary"].currentValue) {
      this.cardsInfo.forEach(card => {
        card.value = this.walletSummary[card.id as keyof summaryWalletsResponse];
      });
    }
  }
}
