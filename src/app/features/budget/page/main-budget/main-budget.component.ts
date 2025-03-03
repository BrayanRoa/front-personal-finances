import { Component, OnInit, signal } from '@angular/core';
import { BudgetData, IBudgets } from '../../interfaces/budget.interface';
import { BudgetDataService } from '../../service/budget-data.service';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { SummaryInterface } from '../../../../shared/interfaces/generic-components/form.interface';
import { CommonResponse } from '../../../../shared/interfaces/common-response.interface';
import { ISummaryBudget } from '../../interfaces/summary-budget.interface';

@Component({
  selector: 'app-main-budget',
  templateUrl: './main-budget.component.html',
  styleUrl: './main-budget.component.css'
})
export class MainBudgetComponent extends BaseComponent implements OnInit {

  budgetData: IBudgets[] = [];
  summaryBudget = signal<ISummaryBudget | null>(null);

  viewModal: boolean = false;

  constructor(
    private budgetService: BudgetDataService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getSummaryBudgets()
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetService.getAll().subscribe({
      next: (response: { data: IBudgets[] }) => {
        this.budgetData = response.data.map(budgetData => {
          const limitAmount = Number(budgetData.limit_amount) || 0; // Forzar la conversión a número
          const currentAmount = Number(budgetData.current_amount) || 0; // Usar curren_amount
          const percentage = Math.round((currentAmount / limitAmount) * 100);
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

  getSummaryBudgets() {
    this.budgetService.summaryBudgets().subscribe({
      next: (response) => {
        this.summaryBudget.set(response.data)
      },
      error: (error: any) => this.handleError(error),

    })
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
      complete: ()=>{
        this.toggleModal(false);
      },
      next: (response) => {
        this.getBudgets();
        this.handleResponse(response.status, response.data);
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
    this.viewModal = visible;
  }
}
