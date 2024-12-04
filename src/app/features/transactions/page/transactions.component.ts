import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';
import { MetaData, ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { ActivatedRoute } from '@angular/router';
import { MONTHS, PAGE, PER_PAGE } from '../../../shared/constants/constants';
import { actionsButton } from '../../../shared/interfaces/use-common.interfce';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { confirmDelete } from '../../../shared/components/sweet-alert-modal/sweet-alert-modal';
import { DropdownOption } from '../../../shared/components/bottons/drop-down/drop-down.component';
import { FORM_CONFIG } from '../statics/transaction.config';
import { CoreService } from '../../../core/service/core.service';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';

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
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent extends BaseComponent implements OnInit {

  // Signals
  selectedBankId = signal<number | null>(null);
  selectedYear = signal<number | null>(null);
  selectedMonth = signal<number>(new Date().getMonth() + 1);
  nameMonthSelected = signal<string>('');
  years = signal<DropdownOption[]>([]);
  walletsData = signal<BanksInformation[]>([]);
  categoryData = signal<CategoryInterface[]>([]);

  // Selected Transaction for editing
  transactionSelected!: Transaction;

  // Constants
  months = MONTHS;

  // Modal Visibility
  public visible: boolean = false;

  // Form Structure
  formConfig = FORM_CONFIG;

  // Data Shared
  transactions: Transaction[] = [];
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  // Table Columns
  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'category.name', header: 'Category' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Date' },
    { field: 'type', header: 'Type' },
    { field: 'repeat', header: 'Repeat' },
  ];

  // Actions for buttons in table
  actions: actionsButton<Transaction>[] = [
    {
      label: '',
      type: 'button',
      icon: 'pi pi-pencil',
      color: 'primary',
      callback: (row: number | string, transaction: Transaction) => this.editRow(row, transaction),
    },
    {
      label: '',
      type: 'button',
      icon: 'pi pi-trash',
      color: 'danger',
      callback: (row: number | string) => this.deleteRow(row),
    },
  ];

  // Event Trigger
  eventTrigger = false;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private coreService: CoreService
  ) {
    super();
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

    this.loadTransactions();
    this.loadCategories();
  }

  // Event Handlers for Bank, Year, Month
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

  // Private Methods to Load Data
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
      ...params,
    };

    this.transactionService.getTransactions(finalParams).subscribe({
      next: (transactions: ApiResponse<TransactionData>) => {
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
        this.years.set(yearsList); // Update signal with years data
      },
      error: (error: any) => {
        console.error('Error fetching years:', error);
      },
    });
  }

  loadCategories(): void {
    this.coreService.getCategories().subscribe({
      next: (response) => {
        this.categoryData.set(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  // Modal and Transaction Editing Methods
  editRow(row: any, transaction: Transaction) {
    this.showDialog();

    const transactionPayload: Transaction = {
      ...transaction,
      date: new Date(transaction.date).toISOString().split('T')[0],
      walletId: +transaction.walletId,
      categoryId: +transaction.categoryId,
    };

    this.transactionSelected = transactionPayload;
  }

  showDialog() {
    this.formConfig.forEach(data => {
      if (data.name === 'walletId') {
        data.options = this.walletsData().map(data => ({
          label: data.name,
          value: data.id,
        }));
      }
      if (data.name === 'categoryId') {
        data.options = this.categoryData().map(data => ({
          label: data.name,
          value: data.id,
        }));
      }
    });

    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  saveTransaction(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    const transactionPayload: Transaction = {
      ...form.value,
      active: !!form.value.repeat,
      walletId: +form.value.walletId,
      categoryId: +form.value.categoryId,
    };

    this.transactionService.createTransaction(transactionPayload).pipe(
      finalize(() => {
        this.visible = false;
      })
    ).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.eventTrigger = !this.eventTrigger;
        this.loadTransactions();
      },
      error: (error: CommonResponse) => {
        console.error('Error creating transaction:', error);
        this.handleResponse(error.status, error.data);
      },
    });
  }

  // Delete Transaction
  deleteRow(id: number | string) {
    confirmDelete().then((isConfirmed) => {
      if (isConfirmed) {
        this.transactionService.deleteTransaction(id).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.loadTransactions();
            this.eventTrigger = !this.eventTrigger;
          },
          error: (error: CommonResponse) => {
            this.handleResponse(error.status, error.data);
          },
        });
      }
    });
  }
}
