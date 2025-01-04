import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TABLE_COLUMNS_BUDGET } from '../../statics/budget.config';
import { BudgetData } from '../../interfaces/budget.interface';
import { BudgetService } from '../../service/budget.service';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-all-budgets',
  templateUrl: './all-budgets.component.html',
  styleUrl: './all-budgets.component.css'
})
export class AllBudgetsComponent {

  // TABLE
  // visible: boolean = false;
  tableColumns = TABLE_COLUMNS_BUDGET
  transactions: Transaction[] = []
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  // MODAL FORM
  modalForm: boolean = false;
  budgetToEdit!: BudgetData | null

  constructor(
    private budgetService: BudgetService
  ) { }

  // EVERY CARD 
  @Input()
  budgetData: BudgetData[] = []

  @Output()
  dataToEdit = new EventEmitter<({ budget: BudgetData, id: number })>


  closeModalForm() {
    this.modalForm = false;
    this.budgetToEdit = null;
  }

  getTransactions(budget: BudgetData) {
    // this.visible = true;
    const ids = budget.BudgetCategories?.map(c => {
      return c.categoryId
    })

    this.budgetService.getTransactionsByBudget(ids!, budget.date.toString(), budget.end_date.toString()).subscribe({
      next: (response) => {
        this.transactions = response.data.transactions
        this.metaData = response.data.meta
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    })
  }

  editBudget(budget: BudgetData) {
    this.budgetToEdit = budget;
    this.modalForm = true;
  }

  sendBudgeToEdit(data: { budget: BudgetData, id: number }) {
    this.dataToEdit.emit(data)
  }
}
