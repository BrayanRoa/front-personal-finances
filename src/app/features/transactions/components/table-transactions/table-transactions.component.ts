import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { actionsButton } from '../../../../shared/interfaces/use-common.interfce';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';
import { TABLE_COLUMNS_TRANSACTION } from '../../statics/transaction.config';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrl: './table-transactions.component.css'
})
export class TableTransactionsComponent implements OnInit {

  isMobile: boolean = false;
  layout: 'list'| 'grid' = 'list';

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

  tableColumns = TABLE_COLUMNS_TRANSACTION
  registersPerPage = 10


  actions: actionsButton<Transaction>[] = [
    {
      label: '',
      type: 'button',
      icon: 'pi pi-pencil',
      color: 'info',
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

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    this.isMobile = window.innerWidth < 1100; // Umbral de 1100px para móviles
  }

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
  }

  onPageChange(data: { page: number; per_page: number }): void {
    this.pageChange.emit(data);
    this.registersPerPage = data.per_page
  }
}
