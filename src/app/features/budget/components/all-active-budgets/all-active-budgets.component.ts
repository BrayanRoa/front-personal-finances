import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { BudgetData } from '../../interfaces/budget.interface';
import { TABLE_COLUMNS_BUDGET } from '../../statics/budget.config';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';
import { Router } from '@angular/router';
import { BudgetDataService } from '../../service/budget-data.service';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-all-active-budgets',
  templateUrl: './all-active-budgets.component.html',
  styleUrl: './all-active-budgets.component.css'
})
export class AllActiveBudgetsComponent extends BaseComponent implements OnInit {

  isLoading: boolean = true

  // EVERY CARD 
  @Input()
  budgetData: BudgetData[] = []

  @Output()
  budgetToDelete = new EventEmitter<(number)>

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
  ) {
    super()
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }

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

  deleteBudget(id: number) {
    this.budgetToDelete.emit(id);
  }

}