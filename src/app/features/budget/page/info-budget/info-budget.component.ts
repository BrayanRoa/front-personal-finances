import { Component, Input, OnInit } from '@angular/core';
import { TABLE_COLUMNS_TRANSACTION } from '../../../transactions/statics/transaction.config';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetData } from '../../interfaces/budget.interface';
import { BudgetDataService } from '../../service/budget-data.service';
import { SummaryInterface } from '../../../../shared/interfaces/generic-components/form.interface';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-info-budget',
  templateUrl: './info-budget.component.html',
  styleUrl: './info-budget.component.css'
})
export class InfoBudgetComponent extends BaseComponent implements OnInit {

  table_columns = TABLE_COLUMNS_TRANSACTION
  budgetId: number = 0

  transactions: Transaction[] = []
  budget!: BudgetData
  percentageBudet: number = 0

  @Input()
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  budgetCard: SummaryInterface[] = [
    { title: "Total Budgets", icon: "pi pi-money-bill", value: 0, cardImg: 'total-incomes', idTitle: 'title-one', idValue: 'amount-one', useCurrency: true },
    { title: "Spend To Date", icon: "pi pi-shop", value: 0, cardImg: 'total-expenses', idTitle: 'title-two', idValue: 'amount-two', useCurrency: true },
    { title: "Available for spending", icon: "pi pi-wallet", value: 0, cardImg: 'budgets', idTitle: 'title-three', idValue: 'amount-three', useCurrency: false }
  ];

  viewModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetDataService,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.budgetId = +this.route.snapshot.paramMap.get('id')!;
    this.getBudget()
  }

  getBudget() {
    this.budgetService.getOne(this.budgetId).subscribe({
      next: (response) => {
        this.budget = response.data;
        this.percentageBudet = this.budget.percentage!
        console.log("aaaa",this.percentageBudet);
        // Llamar a getTransactions después de obtener el budget
        this.getTransactions();
      },
      error: (error) => {
        console.error('Error fetching budget:', error);
      }
    });
  }

  getTransactions() {

    const categoryIds = this.budget.BudgetCategories?.map((category) => {
      return category.categoryId
    })

    this.budgetService.getTransactionsByBudget(categoryIds!, this.budget.date.toString(), this.budget.end_date.toString()).subscribe({
      next: (response) => {
        this.transactions = response.data.transactions
        this.metaData = response.data.meta
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    })
  }

  backBudgets() {
    this.router.navigate(['/main/budgets']);
  }

  // loadDataBudget() {
  //   this.toggleModal(true)
  // }

  toggleModal(value: boolean) {
    if (this.viewModal === false) {
      this.getBudget()
    }
    this.viewModal = value;
  }

  updateBudget(value: { budget: BudgetData, action: string }) {
    const { id, ...info } = value.budget;
    info.date = new Date(info.date)
    info.end_date = new Date(info.end_date)
    this.budgetService.update(id!, info).subscribe({
      next: (response) => {
        console.log(response);
        this.handleResponse(response.status, response.data)
        this.getBudget()
        this.toggleModal(false)
      },
      error: (error) => {
        console.error('Error updating budget:', error);
      }
    });
  }

}
