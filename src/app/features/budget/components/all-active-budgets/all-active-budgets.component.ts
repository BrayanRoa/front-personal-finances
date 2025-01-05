import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { BudgetData } from '../../interfaces/budget.interface';
import { TABLE_COLUMNS_BUDGET } from '../../statics/budget.config';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';
import { Router } from '@angular/router';
import { BudgetDataService } from '../../service/budget-data.service';

@Component({
  selector: 'app-all-active-budgets',
  templateUrl: './all-active-budgets.component.html',
  styleUrl: './all-active-budgets.component.css'
})
export class AllActiveBudgetsComponent implements OnInit {

  isLoading: boolean = true

  // EVERY CARD 
  @Input()
  budgetData: BudgetData[] = []

  budgetToEdit!: BudgetData;

  tableColumns = TABLE_COLUMNS_BUDGET
  transactions: Transaction[] = []
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  view_modal: boolean = false;

  constructor(
    private budgetService: BudgetDataService,
    private router: Router
  ) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }

  // getTransactions(budget: BudgetData) {
  //   this.toggleModal()
  //   const ids = budget.BudgetCategories?.map(c => {
  //     return c.categoryId
  //   })

  //   this.budgetService.getTransactionsByBudget(ids!, budget.date.toString(), budget.end_date.toString()).subscribe({
  //     next: (response) => {
  //       this.transactions = response.data.transactions
  //       this.metaData = response.data.meta
  //     },
  //     error: (error) => {
  //       console.error('Error fetching transactions:', error);
  //     }
  //   })
  // }

  editBudget(budget: BudgetData) {
    this.budgetToEdit = budget;
    this.toggleModal()
  }

  toggleModal() {
    this.view_modal = !this.view_modal;
  }

  viewInformation(id: number) {
    this.router.navigate([`/main/budgets/info/${id}`]);
  }

}
