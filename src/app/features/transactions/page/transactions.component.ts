import { Component, signal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionData } from '../../../shared/interfaces/transactions/getAll.interface';
import { MetaData, ApiResponse } from '../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  isDropdownOpen = signal<boolean>(false);
  month: string = "November"


  transactions: Transaction[] = [];
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'category.name', header: 'Category' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Date' },
    { field: 'type', header: 'Type' },
    // { field: 'actions', header: 'Actions' },
  ];

  actions = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      callback: (row: any) => this.editRow(row),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      callback: (row: any) => this.deleteRow(row),
    },
  ];

  constructor(private transactionService: TransactionService) {
    this.loadTransactions(1, 5);
  }

  onSearch(searchTerm: string): void {
    this.loadTransactions(1, 5, searchTerm);
  }

  onPageChange(data: { page: number, per_page: number }) {
    console.log("TRANSACTION", data.page, data.per_page);
    this.loadTransactions(data.page, data.per_page)
  }

  private loadTransactions(page: number = 1, per_page: number = 10, searchTerm: string = ''): void {
    const month = 8
    const year = 2024;
    this.transactionService.getTransactions({ walletId: 1, page, per_page, month: 11, year: 2024, searchTerm }).subscribe({
      next: (transactions: ApiResponse<TransactionData>) => {
        this.transactions = transactions.data.transactions;
        this.metaData = transactions.data.meta;
        console.log(this.transactions);
      },
      error: (error: any) => { //TODO: COLOCAR AQUI UN TIPADO 
        console.error('Error fetching transactions:', error);
      }
    })
  }

  editRow(row: any) {
    console.log('Editing row:', row);
  }

  deleteRow(row: any) {
    console.log('Deleting row:', row);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  selectOption(option: string): void {
    console.log('Option selected:', option);
    this.month = option;
    this.isDropdownOpen.set(false); // Cierra el menú al seleccionar una opción
  }
}
