import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';
import { MetaData, ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { ActivatedRoute } from '@angular/router';
import { MONTHS, PAGE, PER_PAGE, RECURRING_TRANSACTION, SelectInterface, TYPE_TRANSACTION } from '../../../shared/constants/constants';
import { actionsButton } from '../../../shared/interfaces/use-common.interfce';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { confirmDelete } from '../../../shared/components/sweet-alert-modal/sweet-alert-modal';
import { DropdownOption } from '../../../shared/components/bottons/drop-down/drop-down.component';
import { FORM_CONFIG, TABLE_COLUMNS } from '../statics/transaction.config';
import { CoreService } from '../../../core/service/core.service';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { FormGroup } from '@angular/forms';
import { debounceTime, finalize, Observable, Subject } from 'rxjs';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';

interface LoadTransactionParams {
  walletIds: number[] | null;
  page: number;
  per_page: number;
  categoryIds: number[] | null;
  repeats: string[] | null;
  types: string[] | null;
  months: string[] | null;
  years: number | null;
  searchTerm: string;
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
  selectedBanksId = signal<number[] | null>(null);
  selectedCategoriesId = signal<number[] | null>(null)
  selectedTypeTransactionId = signal<string[] | null>(null)
  selectedTypeRecurringTransactionId = signal<string[] | null>(null)
  selectedMonths = signal<string[]>([(new Date().getMonth() + 1).toString()]);
  selectedMonthsName = signal<string[] | null>(null);
  // nameMonthDefault = signal<string>('');
  selectedYear = signal<number | null>(null);

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

  // Constants
  months = MONTHS;
  type_transactions = TYPE_TRANSACTION
  recurring_transaction = RECURRING_TRANSACTION

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
  
  // Event Trigger
  eventTrigger = false;

  // search
  inputSubject = new Subject<string>();


  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private coreService: CoreService
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
      const categories = this.selectedCategoriesId();
      if (categories) {
        this.loadTransactions();
      }
    });

    effect(() => {
      const banks = this.selectedBanksId();
      if (banks) {
        this.loadTransactions();
      } else {

      }
    });

    effect(() => {
      const types = this.selectedTypeTransactionId();
      if (types) {
        this.loadTransactions();
      }
    });
  }

  ngOnInit(): void {

    this.selectedMonthsName.set(
      [MONTHS.filter(month => +month.id === new Date().getMonth() + 1)[0].name]
    );

    const resolverData = this.route.snapshot.data['walletsData'];
    if (resolverData?.data) {
      this.walletsData.set(resolverData.data);
      this.selectedBanksId.set(this.walletsData().map(wallet =>
        wallet.id
      ));
    }
    this.loadYears();
    this.loadTransactions();
    this.loadCategories();
    this.formConfig = FORM_CONFIG;
  }

  // methods to search in the list of transactions
  onInputChangeWithDebounce(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputSubject.next(input);
  }

  onSearch(searchTerm: string): void {
    this.loadTransactions({ searchTerm });
  }

  onPageChange(data: { page: number; per_page: number }): void {
    this.loadTransactions({ page: data.page, per_page: data.per_page });
  }

  // Private Methods to Load Data
  private loadTransactions(params?: Partial<LoadTransactionParams>): void {

    const finalParams: LoadTransactionParams = {
      walletIds: this.selectedBanksId(),
      page: PAGE ?? 1,
      per_page: PER_PAGE ?? 10,
      categoryIds: this.selectedCategoriesId(),
      repeats: this.selectedTypeRecurringTransactionId(),
      types: this.selectedTypeTransactionId(),
      months: this.selectedMonths(),
      years: this.selectedYear(),
      searchTerm: '',
      ...params,
    };

    console.log("aaaaaaaaa", finalParams);

    this.transactionService.getTransactions(finalParams).subscribe({
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
    this.formConfig = FORM_CONFIG
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

  async showDialog() {
    // Configurar las opciones antes de abrir el diálogo
    await this.loadOptions()
    this.visible = true;
  }

  closeModal() {
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
        this.eventTrigger = !this.eventTrigger;
        this.loadTransactions();
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

  // generic method to change values of the selected
  // ojo, aqui ese generico con ese objeto dice que todos los metodos 
  // que le pases una interface o lo que sea debe tener un id ya sea de tipo string o number 
  handleSignalChange<T extends { id: string | number }>(
    event: any,
    signal: WritableSignal<(string | number)[] | null>
  ): void {
    if (Array.isArray(event.value)) {
      const selectedIds = event.value.map((item: T) => item.id);
      signal.set(selectedIds);
    } else {
      console.error('El valor del evento no es un array:', event.value);
    }
  }

  onChangeBank(event: any) {
    this.handleSignalChange<BanksInformation>(event, this.selectedBanksId);
  }

  onChangeCategories(event: any) {
    this.handleSignalChange<CategoryInterface>(event, this.selectedCategoriesId);
  }

  onChangeTypeTransactions(event: any) {
    this.handleSignalChange<SelectInterface>(event, this.selectedTypeTransactionId);
  }

  onChangeRecurringTransaction(event: any) {
    this.handleSignalChange<SelectInterface>(event, this.selectedTypeRecurringTransactionId);
  }

  onChangeYears(event: any): void {
    this.selectedYear.set(event.value.id)
    // if(event.value){
    // }
  }

  onChangeMonths(event: any): void {
    if (Array.isArray(event.value)) {
      const selectedIds = event.value.map((month: SelectInterface) => month.id);
      const selectedNames = event.value.map((month: SelectInterface) => month.name);

      this.selectedMonths.set(selectedIds);
      this.selectedMonthsName.set(selectedNames);

      if (selectedIds.length === 0) {
        this.selectedMonthsName.set(["December"]);
      }
    } else {
      console.error('El valor del evento no es un array:', event.value);
    }
  }

}
