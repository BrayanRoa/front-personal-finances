import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';
import { ResponseData, Transaction, MetaData, ApiResponse } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrl: './dashboard-control.component.css'
})
export class DashboardControlComponent implements OnInit {

  public transactions: Transaction[] = [];
  public meta!: MetaData;

  constructor(
    private transactionsService: TransactionsService
  ) {}
  ngOnInit(): void {
    this.getTransactions()
  }

  onObtenerPagina(event: { page: number, search?: string, year: number, month: number }) {
    this.getTransactions(event.page, event.search, event.year, event.month)
  }

  onRowSelected(event: { page: number, search?: string, year: number, month: number }) {
    this.getTransactions(event.page, event.search, event.year, event.month)
  }

  getTransactions(page: number = 1, search: string="", year: number = new Date().getFullYear(), month: number = new Date().getMonth() + 1) {
    page = page || 1; // Si no se pasa página, se toma la 1era por defecto

    this.transactionsService.getTransactions({ walletId: 1, page, per_page: 10, year, month, search }).subscribe({
      next: (transactions) => {
        this.transactions = transactions.data.transactions
        console.log("CCCC", this.transactions);
        this.meta = transactions.data.meta
      },
      error: (error) => console.error('Error retrieving transactions', error)
    })
  }


}
