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
  budgetData: BudgetData[] = [];
  transactions: ITransactionByBudget[] = [];
  visible: boolean = false;

  budgetCard: SummaryInterface[] = [
    { title: "Total Budgets", icon: "pi pi-money-bill", value: 0, cardImg: 'total-incomes', idTitle: 'title-one', idValue: 'amount-one', useCurrency: true },
    { title: "Spend To Date", icon: "pi pi-shop", value: 0, cardImg: 'total-expenses', idTitle: 'title-two', idValue: 'amount-two', useCurrency: true },
    { title: "Available for spending", icon: "pi pi-wallet", value: 0, cardImg: 'budgets', idTitle: 'title-three', idValue: 'amount-three', useCurrency: false }
  ];

  constructor(private budgetService: BudgetService) {
    super();
  }

  ngOnInit(): void {
    this.initializeBudgets();
  }

  private initializeBudgets(): void {
    this.getBudgets();
  }

  toggleModal(visible: boolean): void {
    this.visible = visible;
  }

  getBudgets(): void {
    this.budgetService.getAll().subscribe({
      next: (response: { data: BudgetData[] }) => {
        this.budgetData = response.data;
        this.updateBudgetCardValues();
      },
      error: (error: any) => this.handleError(error),
    });
  }

  updateBudgetCardValues(): void {
    this.budgetCard[0].value = this.budgetData.length;
    this.budgetCard[1].value = this.budgetData.reduce((sum, b) => sum + b.current_amount!, 0);
    this.budgetCard[2].value = this.budgetData.reduce((sum, b) => sum + (b.limit_amount - b.current_amount!), 0);
  }

  saveBudget(data: { budget: BudgetData }): void {
    this.budgetService.save(data.budget).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.getBudgets();
        this.toggleModal(false);
      },
      error: (error: any) => this.handleError(error),
    });
  }

  updateBudget(data: { budget: BudgetData, id: number }): void {
    const updatedBudget = this.mapBudgetUpdate(data.budget);
    this.budgetService.update(data.id, updatedBudget).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.getBudgets();
        this.toggleModal(false);
      },
      error: (error: any) => this.handleError(error),
    });
  }

  private mapBudgetUpdate(budget: BudgetData): BudgetData {
    const { active, percentage, current_amount, ...info } = budget;
    return { ...info, limit_amount: +info.limit_amount };
  }

  private handleError(error: any): void {
    console.error('Error:', error);
  }
}
