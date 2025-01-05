import { Component, effect, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';
import { MetaData, ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { ActivatedRoute } from '@angular/router';
import { MONTHS, SelectInterface } from '../../../shared/constants/constants';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { confirmDelete } from '../../../shared/components/sweet-alert-modal/sweet-alert-modal';
import { DropdownOption } from '../../../shared/components/bottons/drop-down/drop-down.component';
import { FORM_CONFIG_TRANSACTION } from '../statics/transaction.config';
import { CoreService } from '../../../core/service/core.service';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { FormGroup } from '@angular/forms';
import { debounceTime, finalize, Observable, Subject } from 'rxjs';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FiltersService } from '../services/filters.service';

export interface LoadTransactionParams {
  walletIds?: number[] | null;
  page?: number;
  per_page: number;
  categoryIds?: number[] | null;
  repeats?: string[] | null;
  types?: string[] | null;
  months?: string[] | null;
  years?: number | null;
  searchTerm?: string;
}

export interface BalanceInformation {
  totalIncomes: number;
  totalExpenses: number;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent extends BaseComponent implements OnInit {

  // Signals
  selectedMonthsName: string[] = []

  months: string[] = []

  // Data Signals
  years = signal<DropdownOption[]>([]);
  walletsData = signal<BanksInformation[]>([]);
  categoryData = signal<CategoryInterface[]>([]);

  balanceInformation = signal<BalanceInformation>({
    totalIncomes: 0,
    totalExpenses: 0
  });

  // Selected Transaction for editing
  transactionSelected!: Transaction;
  @Output() resetForm = new EventEmitter<void>();

  // Modal Visibility
  visible: boolean = false;

  // Form Structure
  formConfig!: FormFieldConfig[] | null;
  nameButton: string = 'save';
  idTransactionSelected = signal<number>(0)

  // Data Shared
  transactions: Transaction[] = [];
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  // search
  inputSubject = new Subject<string>();


  monthsMap = {
    '=1': "transactions of the month:",
    'other': "transactions of the months:"
  }


  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private coreService: CoreService,
    private filtersService: FiltersService
  ) {
    super();

    this.inputSubject.pipe(debounceTime(300)).subscribe((value) => {
      if (value.length >= 3) {
        this.onSearch(value)
      } else if (value.length < 3) {
        this.onSearch("")
      }
    });

    effect(() => {
      const filters = this.filtersService.filters();
      this.loadTransactions(filters);
    });

    effect(() => {
      if (this.filtersService.reloadTransactions()) {
        const filters = this.filtersService.filters();
        this.loadTransactions(filters);
      }
    });

    effect(() => {
      if (this.filtersService.selectedMonths()) {
        const months = this.filtersService.selectedMonths();
        this.selectedMonthsName = months.length > 0
          ? MONTHS.filter((month) => months.includes(month.id)).map((month) => month.name)
          : [MONTHS.find((month) => +month.id === new Date().getUTCMonth() + 1)?.name ?? ''];
      }
    })

  }

  ngOnInit(): void {
    // this is important to ensure that the filters are initialized properly
    this.filtersService.resetFilters()

    this.selectedMonthsName =
      [MONTHS.filter(month => +month.id === new Date().getMonth() + 1)[0].name]


    const resolverData = this.route.snapshot.data['walletsData'];
    if (resolverData?.data) {
      this.walletsData.set(resolverData.data);
    }

    this.loadYears();
    this.loadCategories();

    // this is important because load the initial configuration of the form
    this.formConfig = FORM_CONFIG_TRANSACTION;
  }

  // methods to search in the list of transactions
  onInputChangeWithDebounce(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputSubject.next(input);
  }

  onSearch(searchTerm: string): void {
    const filters = this.filtersService.filters();
    this.loadTransactions({ ...filters, searchTerm });
  }

  onPageChange(data: { page: number; per_page: number }): void {
    this.filtersService.pagination.set(data)
  }

  // Private Methods to Load Data
  private loadTransactions(filters: LoadTransactionParams): void {

    this.transactionService.getTransactions(filters).subscribe({
      next: (transactions: ApiResponse<TransactionData>) => {
        this.transactions = transactions.data.transactions;
        this.balanceInformation.set({
          totalIncomes: transactions.data.totalIncome,
          totalExpenses: transactions.data.totalExpenses,
        })
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

  private loadCategories(): void {
    this.coreService.getCategories().subscribe({
      next: (response) => {
        this.categoryData.set(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  private loadOptions() {
    this.formConfig = FORM_CONFIG_TRANSACTION
    return new Promise<void>((resolve, reject) => {
      this.formConfig!.forEach(data => {
        if (data.name === 'walletId') {
          data.options = [
            ...this.walletsData().map(wallet => ({
              label: wallet.name,
              value: wallet.id,
            })),
          ];
        }
        if (data.name === 'categoryId') {
          data.options = [
            ...this.categoryData().map(category => ({
              label: category.name,
              value: category.id,
            })),
          ];
        }
      });
      resolve();
    });
  }

  // Modal and Transaction Editing Methods
  // these methods populate form data but not send the data to the server, only populate the form data
  editRow(data: { id: number, transaction: Transaction }) {
    this.loadOptions()
    this.idTransactionSelected.set(data.id)
    this.transactionSelected = data.transaction;
    this.nameButton = "update"
    this.visible = true
  }

  // Delete Transaction
  deleteRow(id: number) {
    confirmDelete().then((isConfirmed) => {
      if (isConfirmed) {
        this.transactionService.deleteTransaction(id).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            // this.loadTransactions();
            this.filtersService.triggerReload();
            // this.eventTrigger = !this.eventTrigger;
          },
          error: (error: CommonResponse) => {
            this.handleResponse(error.status, error.data);
          },
        });
      }
    });
  }

  addTransaction() {
    this.nameButton = "save"
    this.showDialog()
  }

  async showDialog() {
    // Configurar las opciones antes de abrir el modal
    this.resetForm.emit(); // Emitir evento para reiniciar el formulario
    await this.loadOptions()
    this.visible = true;
  }

  closeModal() {
    console.log("SIIIIIII");
    this.resetForm.emit(); // Emitir evento para reiniciar el formulario
    this.visible = false;
    this.formConfig = null
  }

  saveOrUpdateTransaction(event: { data: FormGroup; action: string }) {
    if (!this.isFormValid(event.data)) return;
    const transactionPayload: Transaction = {
      ...event.data.value,
      active: !!event.data.value.repeat,
      walletId: +event.data.value.walletId,
      categoryId: +event.data.value.categoryId,
    };
    const action$ = event.action === 'update'
      ? this.transactionService.updateTransaction(this.idTransactionSelected(), transactionPayload)
      : this.transactionService.createTransaction(transactionPayload);

    this.handleTransaction(action$);
  }

  // generic method to manage differents observables (in this case update y create transaction)
  private handleTransaction(action$: Observable<ApiResponse<any>>) {
    action$.pipe(
      finalize(() => {
        this.closeModal()
      })
    ).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.filtersService.triggerReload();
        // this.loadTransactions();
      },
      error: (error: CommonResponse) => this.handleError(error),
    });
  }

  private isFormValid(form: FormGroup): boolean {
    if (!form.valid) {
      console.error('Form is invalid:', form.errors);
      return false;
    }
    return true;
  }

  private handleError(error: CommonResponse) {
    this.handleResponse(error.status, error.data);
    console.error('Detailed error log:', error);
  }

}
