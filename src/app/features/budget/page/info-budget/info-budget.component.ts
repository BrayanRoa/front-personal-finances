import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  available_amount: number = 0

  loading: boolean = true

  isMobile: boolean = false;

  groupedTransactions: Record<string, Transaction[]> = {};
  sortedDates: string[] = [];


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
    this.checkWindowSize()
    // Obtener el parámetro 'id' de la URL
    this.budgetId = +this.route.snapshot.paramMap.get('id')!;
    this.getBudget()

    setTimeout(() => {
      this.loading = false;
      this.groupCategories()
    }, 1000)
  }

  getBudget() {
    this.budgetService.getOne(this.budgetId).subscribe({
      next: (response) => {
        this.budget = response.data;
        let current_amount = 0
        this.budget.BudgetTransaction?.forEach(transaction => {
          if (transaction.transaction.deleted_at === null && transaction.deleted_at === null) {
            current_amount += transaction.transaction.amount
            this.transactions.push(transaction.transaction)
          }
        })
        this.available_amount = this.budget.limit_amount! - current_amount
        this.percentageBudet = Math.round((current_amount / response.data.limit_amount) * 100)
      },
      error: (error) => {
        console.error('Error fetching budget:', error);
      }
    });
  }

  backBudgets() {
    this.router.navigate(['/main/budgets']);
  }

  toggleModal(value: boolean) {
    this.viewModal = value;
  }

  updateBudget(value: { budget: BudgetData, action: string }) {
    const { id, ...info } = value.budget;
    info.date = new Date(info.date)
    info.end_date = new Date(info.end_date)
    this.budgetService.update(id!, info).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data)
        this.transactions = []
        this.getBudget()
        this.toggleModal(false)
      },
      error: (error) => {
        console.error('Error updating budget:', error);
      }
    });
  }

  groupCategories() {
    this.groupedTransactions = this.transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
      const dateKey = new Date(transaction.date).toISOString().split('T')[0]; // Convertimos la fecha a string (YYYY-MM-DD)

      if (!acc[dateKey]) {
        acc[dateKey] = [];  // Inicializamos el array
      }

      acc[dateKey].push(transaction); // Ahora sí agregamos la transacción

      return acc;
    }, {});

    // Obtener y ordenar las fechas de mayor a menor
    this.sortedDates = Object.keys(this.groupedTransactions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    this.isMobile = window.innerWidth < 800; // Umbral de 1100px para móviles
  }

}
