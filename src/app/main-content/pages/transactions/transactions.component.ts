import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionData } from '../../interfaces/transactions/getAll.interface';
import { MetaData, ApiResponse } from '../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

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

}
