import { Component } from '@angular/core';
import { SummaryInterface } from '../../../shared/interfaces/generic-components/form.interface';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent {

  budgetData: SummaryInterface[] = [
    {
      // id: "totalIncome",
      title: "Total Budgets",
      icon: "pi pi-money-bill",
      value: 0,
      cardImg: 'total-incomes',
      idTitle: 'title-one',
      idValue: 'amount-one',
      useCurrency: true
    },
    {
      // id: "totalExpenses",
      title: "Spend To Date",
      icon: "pi pi-shop",
      value: 0,
      cardImg: 'total-expenses',
      idTitle: 'title-two',
      idValue: 'amount-two',
      useCurrency: true
    },
    {
      // id: "budgetsActives",
      title: "Available for spending",
      icon: "pi pi-wallet",
      value: 0,
      cardImg: 'budgets',
      idTitle: 'title-three',
      idValue: 'amount-three',
      useCurrency: false
    },
  ]
}
