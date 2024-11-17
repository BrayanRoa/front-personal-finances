import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../interfaces/transactions/getAll.interface';
import { ApiResponse, MetaData } from '../../../shared/interfaces/common-response.interface';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { budgetInformation, graphPolarity, graphVerticalData, summaryWalletsResponse } from '../../interfaces/dashboard/summary-wallets.interface';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrl: './dashboard-control.component.css'
})
export class DashboardControlComponent implements OnInit {

  summaryWallets!: summaryWalletsResponse; ///
  verticalGraph: graphVerticalData[] = []
  polarityGraph: graphPolarity[] = [];
  budgetInformation!: budgetInformation[];

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
    this.loadSummaryWallets();
    this.loadGraphVertical();
    this.loadGraphPolarity();
    this.loadBudgetInformation();
    // this.loadTransactions(1, 10);
  }

  // onPageChange(data: { page: number, per_page: number }): void {
  //   this.loadTransactions(data.page, data.per_page);
  // }

  // onSearch(searchTerm: string): void {
  //   this.loadTransactions(1, 10, searchTerm);
  // }

  // private loadTransactions(page: number = 1, per_page: number = 10, searchTerm: string = ''): void {
  //   const month = 8
  //   const year = 2024;
  //   this.dashboardService.getTransactions({ walletId: 1, page, per_page, month: 10, year: 2024, searchTerm }).subscribe({
  //     next: (transactions: TransactionResponse) => {
  //       this.transactions = transactions.data.transactions;
  //       this.metaData = transactions.data.meta;

  //     },
  //     error: (error:any) => { //TODO: COLOCAR AQUI UN TIPADO 
  //       console.error('Error fetching transactions:', error);
  //     }
  //   })
  // }

  loadSummaryWallets() {
    this.dashboardService.summaryWallets().subscribe({
      next: (response: ApiResponse<summaryWalletsResponse>) => {
        this.summaryWallets = response.data; // Asigna el campo `data` al objeto `summaryWallets`
        console.log(this.summaryWallets);
      },
      error: (error: any) => {
        console.error('Error fetching summary wallets:', error);
      }
    });
  }

  loadGraphVertical() {
    // TODO: AQUI COLOCAR EL AÑO DINAMICO, SI NO SE ENVIA COLOCAR EL AÑO ACTUAL
    const year = new Date().getFullYear();

    this.dashboardService.graphVertical(year.toString()).subscribe({
      next: (response: ApiResponse<graphVerticalData[]>) => {
        console.log(response.data);
        this.verticalGraph = response.data; // Asigna el campo `data` al objeto `verticalGraph`
      },
      error: (error: any) => {
        console.error('Error fetching graph vertical:', error);
      }
    });
  }

  loadGraphPolarity() {
    // TODO: AQUI COLOCAR EL A��O DINAMICO, SI NO SE ENVIA COLOCAR EL A��O ACTUAL

    this.dashboardService.graphPolarity().subscribe({
      next: (response: ApiResponse<graphPolarity[]>) => {
        console.log(response.data);
        this.polarityGraph = response.data; // Asigna el campo `data` al objeto `verticalGraph`
      },
      error: (error: any) => {
        console.error('Error fetching graph polar:', error);
      }
    });
  }

  loadBudgetInformation() {
    this.dashboardService.budgetInformation().subscribe({
      next: (response: ApiResponse<budgetInformation[]>) => {
        console.log(response.data);
        this.budgetInformation = response.data; // Asigna el campo `data` al objeto `budgetInformation`
      },
      error: (error: any) => {
        console.error('Error fetching budget information:', error);
      }
    });
  }

}
