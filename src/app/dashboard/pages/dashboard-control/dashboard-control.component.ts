import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionResponse } from '../../interfaces/transactions/getAll.interface';
import { MetaData } from '../../../shared/interfaces/common-response.interface';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrl: './dashboard-control.component.css'
})
export class DashboardControlComponent implements OnInit {

  transactions: Transaction[] = [];
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  // private optionsSubject = new BehaviorSubject({
  //   page: this.metaData.currentPage,
  //   size: this.pageSize,
  //   searchTerm: this.searchTerm,
  //   filterParams: this.filterParams,
  // });

  constructor(
    private readonly dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadTransactions(1, 10);
  }

  onPageChange(data: { page: number, per_page: number }): void {
    this.loadTransactions(data.page, data.per_page);
  }

  onSearch(searchTerm: string): void {
    this.loadTransactions(1, 10, searchTerm);
  }

  private loadTransactions(page: number = 1, per_page: number = 10, searchTerm: string = ''): void {
    const month = 8
    const year = 2024;
    this.dashboardService.getTransactions({ walletId: 1, page, per_page, month: 10, year: 2024, searchTerm }).subscribe({
      next: (transactions: TransactionResponse) => {
        this.transactions = transactions.data.transactions;
        this.metaData = transactions.data.meta;

      },
      error: (error:any) => { //TODO: COLOCAR AQUI UN TIPADO 
        console.error('Error fetching transactions:', error);
      }
    })
  }

}
