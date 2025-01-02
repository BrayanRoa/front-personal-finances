import { Component, OnInit } from '@angular/core';
import { FormFieldConfig, SummaryInterface } from '../../../shared/interfaces/generic-components/form.interface';
import { BudgetService } from '../service/budget.service';
import { BudgetData } from '../interfaces/budget.interface';
import { ITransactionByBudget } from '../interfaces/transaction-by-budget.interface';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent extends BaseComponent implements OnInit {

  budgetData: BudgetData[] = []
  transactions: ITransactionByBudget[] = []
  resetForm: boolean = false

  visible: boolean = false


  budgetCard: SummaryInterface[] = [
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

  constructor(
    private budgetService: BudgetService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getBudgets()
  }

  openModal() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  getBudgets() {
    this.budgetService.getAll().subscribe({
      next: (response) => {
        this.budgetData = response.data;
        console.log(this.budgetData);
      },
      error: (error) => {
        console.error('Error fetching budgets:', error);
      }
    })
  }

  saveBudget(data: { budget: BudgetData }) {
    this.budgetService.save(data.budget).subscribe({
      next: (response) => {
        this.closeModal();
        this.handleResponse(response.status, response.data);
        this.getBudgets()
        this.resetForm = true;
      },
      error: (error) => {
        console.error('Error saving budget:', error);
      }
    })
  }

}
