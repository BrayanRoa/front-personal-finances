import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from '../../interfaces/transaction.interface';
import { MetaData } from '../../interfaces/common-response.interface';
import { CategoryCountData } from '../../interfaces/category.interface';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrl: './dashboard-control.component.css'
})
export class DashboardControlComponent implements OnInit {

  public transactions: Transaction[] = [];
  public countTransactionByCategories: CategoryCountData[] = [];
  public meta!: MetaData;

  constructor(
    private transactionsService: TransactionsService,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.getTransactions()
    this.getCountTransactionsByCategory(1) // Por defecto, se toma la walletId 1
  }

  onObtenerPagina(event: { page: number, per_page: number, search?: string, year: number, month: number }) {
    this.getTransactions(event.page, event.per_page, event.search, event.year, event.month)
  }

  onRowSelected(event: { page: number, per_page: number, search?: string, year: number, month: number }) {
    this.getTransactions(event.page, event.per_page, event.search, event.year, event.month)
  }

  getTransactions(page: number = 1, per_page: number = 10, search: string = "", year: number = new Date().getFullYear(), month: number = new Date().getMonth() + 1, order: string = '', asc: string = 'false') {
    page = page || 1; // Si no se pasa página, se toma la 1era por defecto

    this.transactionsService.getTransactions({ walletId: 1, page, per_page, year, month, search, order, asc }).subscribe({
      next: (transactions) => {
        this.transactions = transactions.data.transactions
        this.meta = transactions.data.meta
      },
      error: (error) => console.error('Error retrieving transactions', error)
    })
  }

  getCountTransactionsByCategory(walletId: number) {
    this.categoryService.getNumberTransactionsByCategories(walletId).subscribe({
      next: (response) => {
        this.countTransactionByCategories = response.data
      },
      error: (error) => console.error('Error retrieving transaction counts', error)
    })
  }
}
