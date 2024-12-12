import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { actionsButton } from '../../../../shared/interfaces/use-common.interfce';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { finalize, Observable } from 'rxjs';
import { ApiResponse, MetaData } from '../../../../shared/interfaces/common-response.interface';
import { TABLE_COLUMNS } from '../../statics/transaction.config';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrl: './table-transactions.component.css'
})
export class TableTransactionsComponent {

  @Input()
  transactions: Transaction[] = [];

  @Input()
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  @Output()
  selectedRecordUpdate = new EventEmitter<({ id: number, transaction: Transaction })>();
  @Output()
  selectedRecordDelete = new EventEmitter<(number)>()

  @Output()
  pageChange = new EventEmitter<({ page: number, per_page: number })>

  tableColumns = TABLE_COLUMNS

  actions: actionsButton<Transaction>[] = [
    {
      label: '',
      type: 'button',
      icon: 'pi pi-pencil',
      color: 'primary',
      callback: (id: number, transaction: Transaction) => this.sendEditRow(id, transaction),
    },
    {
      label: '',
      type: 'button',
      icon: 'pi pi-trash',
      color: 'danger',
      callback: (row: number) => this.deleteRow(row),
    },
  ];

  eventTrigger = false;


  sendEditRow(id: number, transaction: Transaction) {
    const transactionPayload: Transaction = {
      ...transaction,
      date: new Date(transaction.date).toISOString().split('T')[0],
      walletId: +transaction.walletId,
      categoryId: +transaction.categoryId,
    };
    this.selectedRecordUpdate.emit({ id, transaction: transactionPayload })
  }

  // Delete Transaction
  deleteRow(id: number) {
    this.selectedRecordDelete.emit(id)
    // confirmDelete().then((isConfirmed) => {
    //   if (isConfirmed) {
    //     this.transactionService.deleteTransaction(id).subscribe({
    //       next: (response) => {
    //         this.handleResponse(response.status, response.data);
    //         this.loadTransactions();
    //         this.eventTrigger = !this.eventTrigger;
    //       },
    //       error: (error: CommonResponse) => {
    //         this.handleResponse(error.status, error.data);
    //       },
    //     });
    //   }
    // });
  }

  // saveOrUpdateTransaction(event: { data: FormGroup; action: string }) {
  //   if (!this.isFormValid(event.data)) return;

  //   const transactionPayload: Transaction = {
  //     ...event.data.value,
  //     active: !!event.data.value.repeat,
  //     walletId: +event.data.value.walletId,
  //     categoryId: +event.data.value.categoryId,
  //   };
  //   const action$ = event.action === 'update'
  //     ? this.transactionService.updateTransaction(this.idTransactionSelected(), transactionPayload)
  //     : this.transactionService.createTransaction(transactionPayload);

  //   this.handleTransaction(action$);
  // }

  // // generic method to manage differents observables (in this case update y create transaction)
  // private handleTransaction(action$: Observable<ApiResponse<any>>) {
  //   action$.pipe(
  //     finalize(() => {
  //       this.closeModal()
  //     })
  //   ).subscribe({
  //     next: (response) => {
  //       this.handleResponse(response.status, response.data);
  //       this.eventTrigger = !this.eventTrigger;
  //       this.loadTransactions();
  //     },
  //     error: (error: CommonResponse) => this.handleError(error),
  //   });
  // }

  onPageChange(data: { page: number; per_page: number }): void {
    this.pageChange.emit(data);
    // this.loadTransactions({ page: data.page, per_page: data.per_page, searchTerm: data.search });
  }
}
