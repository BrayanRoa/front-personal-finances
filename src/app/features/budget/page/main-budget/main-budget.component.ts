import { Component, OnInit } from '@angular/core';
import { BudgetData, IBudgets } from '../../interfaces/budget.interface';
import { BudgetDataService } from '../../service/budget-data.service';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { SummaryInterface } from '../../../../shared/interfaces/generic-components/form.interface';
import { CommonResponse } from '../../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-main-budget',
  templateUrl: './main-budget.component.html',
  styleUrl: './main-budget.component.css'
})
export class MainBudgetComponent extends BaseComponent implements OnInit {

  budgetData: IBudgets[] = [];

  viewModal: boolean = false;

  budgetCard: SummaryInterface[] = [
    {
      id: "totalBudget",
      title: "Total Budgets",
      icon: "pi pi-money-bill",
      value: 0,
      cardImg: 'total-incomes',
      idTitle: 'title-one',
      idValue: 'amount-one',
      useCurrency: true
    },
    {
      title: "Spend To Date",
      icon: "pi pi-shop",
      value: 200,
      cardImg: 'total-expenses',
      idTitle: 'title-two',
      idValue: 'amount-two',
      useCurrency: true
    },
    {
      title: "Available for spending",
      icon: "pi pi-wallet", value: 300,
      cardImg: 'budgets', idTitle: 'title-three',
      idValue: 'amount-three',
      useCurrency: false
    }
  ];


  constructor(
    private budgetService: BudgetDataService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetService.getAll().subscribe({
      next: (response: { data: IBudgets[] }) => {
        this.budgetData = response.data.map(budgetData => {
          const limitAmount = Number(budgetData.limit_amount) || 0; // Forzar la conversión a número
          const currentAmount = Number(budgetData.current_amount) || 0; // Usar curren_amount
          const percentage = Math.round((currentAmount / limitAmount) * 100);
          console.log(currentAmount);
          console.log(limitAmount - currentAmount);
          return {
            ...budgetData,
            percentage,
            available_amount: limitAmount - currentAmount
          };
        });
      },
      error: (error: any) => this.handleError(error),
    });
  }

  eventBudget(value: { budget: BudgetData, action: string }) {
    if (value.action === 'save') {
      this.saveBudget(value.budget);
    }
    this.getBudgets();
    this.toggleModal(false);
  }

  saveBudget(budgetData: BudgetData) {
    this.budgetService.save(budgetData).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.getBudgets();
        this.toggleModal(false);
      },
      error: (error: CommonResponse) => {
        this.handleResponse(error.status, error.statusMsg);
      }
    });
  }


  deletebudget(id: number) {
    this.confirmDelete().then(isConfirmed => {
      if (isConfirmed) {
        this.budgetService.delete(id).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.getBudgets();
          },
          error: (error: any) => this.handleError(error),
        })
      }
    })
  }

  private handleError(error: any): void {
    console.error('Error:', error);
  }

  toggleModal(visible: boolean): void {
    console.log("SI ENTRE");
    this.viewModal = visible;
  }
}
