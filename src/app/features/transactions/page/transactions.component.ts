import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';
import { MetaData, ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { ActivatedRoute } from '@angular/router';
import { dropDowsn } from '../../../shared/components/bottons/drop-down/drop-down.component';
import { MONTHS, PAGE, PER_PAGE } from '../../../shared/constants/constants';
import { actionsButton } from '../../../shared/interfaces/use-common.interfce';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { confirmDelete } from '../../../shared/components/sweet-alert-modal/sweet-alert-modal';

interface LoadTransactionParams {
  page: number;
  per_page: number;
  walletId: number;
  year: number;
  month: number;
  searchTerm?: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent extends BaseComponent implements OnInit {

  selectedBankId = signal<number | null>(null); // Signal para el banco seleccionado
  selectedYear = signal<number | null>(null); // Signal para el año seleccionado
  selectedMonth = signal<number>(new Date().getMonth() + 1); // Signal para el mes seleccionado
  nameMonthSelected = signal<string>(''); // Nombre del mes seleccionado
  years = signal<dropDowsn[]>([]);
  walletsData = signal<BanksInformation[]>([]);

  months = MONTHS;

  // DATA SHARED
  transactions: Transaction[] = [];
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  // STRUCTURE TO DEFINE TABLE
  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'category.name', header: 'Category' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Date' },
    { field: 'type', header: 'Type' },
    { field: 'repeat', header: 'Repeat' },
  ];

  actions: actionsButton[] = [
    {
      label: '',
      type: 'button',
      icon: 'pi pi-pencil',
      color: 'primary',
      callback: (row: number | string) => this.editRow(row),
    },
    {
      label: '',
      type: 'button',
      icon: 'pi pi-trash',
      color: 'danger',
      callback: (row: number | string) => this.deleteRow(row),
    },
  ];

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
    super()
  }

  ngOnInit(): void {
    this.loadYears();
    this.nameMonthSelected.set(
      MONTHS.find((month) => +month.id === this.selectedMonth())?.name || ''
    );

    const resolverData = this.route.snapshot.data['walletsData'];
    if (resolverData?.data) {
      this.walletsData.set(resolverData.data);
      this.selectedBankId.set(this.walletsData()[0]?.id || null);
    }

    this.loadTransactions(); // Cargamos las transacciones iniciales
  }


  onBankSelected(bankId: number): void {
    this.selectedBankId.set(bankId);
    this.loadTransactions();
  }

  onYearSelected(yearId: number): void {
    this.selectedYear.set(yearId);
    this.loadTransactions();
  }

  onMonthChange(options: { id: number | string, name: string }): void {
    this.selectedMonth.set(+options.id);
    const monthName = MONTHS.find((month) => +month.id === +options.id)?.name || '';
    this.nameMonthSelected.set(monthName);
    this.loadTransactions();
  }

  onSearch(option: { page: number, per_page: number, search: string }): void {
    this.loadTransactions({ searchTerm: option.search });
  }

  onPageChange(data: { page: number; per_page: number, search: string }): void {
    this.loadTransactions({ page: data.page, per_page: data.per_page, searchTerm: data.search });
  }

  private loadTransactions(params?: Partial<LoadTransactionParams>): void {
    const walletId = this.selectedBankId();
    if (!walletId) return;

    const finalParams: LoadTransactionParams = {
      walletId,
      page: PAGE ?? 1,
      per_page: PER_PAGE ?? 10,
      year: this.selectedYear() || new Date().getFullYear(),
      month: this.selectedMonth(),
      searchTerm: '',
      ...params, // Sobrescribimos los valores con los parámetros que nos pasen
    };
    console.log("AAAAAAAAAAAAAAAAAAAAA", finalParams);
    this.transactionService.getTransactions(finalParams).subscribe({
      next: (transactions: ApiResponse<TransactionData>) => {
        console.log("ZZZZZ", transactions.data);
        this.transactions = transactions.data.transactions;
        this.metaData = transactions.data.meta;
      },
      error: (error: any) => {
        console.error('Error fetching transactions:', error);
      },
    });
  }

  private loadYears(): void {
    this.transactionService.getYears().subscribe({
      next: (response) => {
        const yearsList = response.data.map((year) => ({
          id: year,
          name: year.toString(),
        }));
        this.years.set(yearsList); // Actualizamos la Signal
      },
      error: (error: any) => {
        console.error('Error fetching years:', error);
      },
    });
  }


  editRow(row: any) {
    console.log('Editing row:', row);
  }

  deleteRow(id: number | string) {
    confirmDelete().then((isConfirmed) => {
      if(isConfirmed){
        this.transactionService.deleteTransaction(id).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.loadTransactions()
          },
          error: (error: CommonResponse) => {
            this.handleResponse(error.status, error.data);
          },
        })
      }
    })
  }
}
