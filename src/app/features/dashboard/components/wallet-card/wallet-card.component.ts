import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { summaryWalletsResponse } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { SummaryInterface } from '../../../../shared/interfaces/generic-components/form.interface';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnInit {

  // obtiene un listado de elementos que tienen ese id
  @ViewChildren('valueElement') valueElements!: QueryList<any>;

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
      this.animateCards();
    }, 1000)
  }

  private animateCards(): void {
    this.valueElements.forEach((element: any, index: number) => {
      const value = this.cardsInfo[index].value;
      const countUp = new CountUp(element.nativeElement, value, {
        duration: 2, // Duración en segundos
        separator: ',', // Separador de miles
        prefix: this.cardsInfo[index].useCurrency ? '$' : '', // Prefijo si es moneda
      });

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }


}
