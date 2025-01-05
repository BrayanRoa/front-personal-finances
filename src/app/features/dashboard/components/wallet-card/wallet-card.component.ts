import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { summaryWalletsResponse } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { SummaryInterface } from '../../../../shared/interfaces/generic-components/form.interface';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnInit {

  isLoading: boolean = true

  @Input()
  walletSummary!: summaryWalletsResponse | null;

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
    setTimeout(() => {
      this.isLoading = false;
      this.cardsInfo.forEach(card => {
        card.value = this.walletSummary![card.id as keyof summaryWalletsResponse];
      });
    }, 1000)
  }
}
