import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../interfaces/transactions/getAll.interface';
import { ApiResponse, MetaData } from '../../../shared/interfaces/common-response.interface';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { budgetData, budgetInformation, graphPolarity, graphVerticalData, summaryWalletsResponse } from '../../interfaces/dashboard/summary-wallets.interface';
import { WalletService } from '../../services/wallet.service';
import { BanksInformation } from '../../interfaces/wallet/wallet.interface';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrl: './dashboard-control.component.css'
})
export class DashboardControlComponent implements OnInit {

  summaryWallets!: summaryWalletsResponse; ///
  verticalGraph: graphVerticalData[] = []
  polarityGraph: graphPolarity[] = [];
  budgetInformation!: budgetData[];
  metaBudgets!: MetaData
  banksInformation!: BanksInformation[]

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
    private readonly dashboardService: DashboardService,
    private readonly walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.loadSummaryWallets();
    this.loadGraphVertical();
    this.loadGraphPolarity();
    this.loadBudgetInformation(1,5);
    this.loadBanksInformations()
    // this.loadTransactions(1, 10);
  }

  onPageChange(data: { page: number, per_page: number }): void {
    console.log("llegue", data);
    this.loadBudgetInformation(data.page, data.per_page);
  }

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

  //* CARDS
  loadSummaryWallets() {
    this.dashboardService.summaryWallets().subscribe({
      next: (response: ApiResponse<summaryWalletsResponse>) => {
        this.summaryWallets = response.data; // Asigna el campo `data` al objeto `summaryWallets`
        console.log("CARDS");
        console.log(this.summaryWallets);
      },
      error: (error: any) => {
        console.error('Error fetching summary wallets:', error);
      }
    });
  }

  //* GRAFICO DE BARRAS
  loadGraphVertical() {
    // TODO: AQUI COLOCAR EL AÑO DINAMICO, SI NO SE ENVIA COLOCAR EL AÑO ACTUAL
    const year = new Date().getFullYear();

    this.dashboardService.graphVertical(year.toString()).subscribe({
      next: (response: ApiResponse<graphVerticalData[]>) => {
        this.verticalGraph = response.data; // Asigna el campo `data` al objeto `verticalGraph`
        console.log("GRAFICO DE BARRAS");
        console.log(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching graph vertical:', error);
      }
    });
  }

  //* GRAFICO DE DONA PARA LOS BANCOS
  loadBanksInformations() {
    this.walletService.banksInformation().subscribe({
      next: (response: ApiResponse<BanksInformation[]>) => {
        this.banksInformation = response.data; // Asigna el campo `data` al objeto `banksInformation`
        console.log("DONA");
        console.log(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching banks information:', error);
      }
    });
  }

  //* GRAFICO PARA LAS CATEGORIAS
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

  //* INFORMACI�N DEL BUDGET
  loadBudgetInformation(page:number, per_page:number) {
    this.dashboardService.budgetInformation(page, per_page).subscribe({
      next: (response: ApiResponse<budgetInformation>) => {
        this.budgetInformation = response.data.budgets; // Asigna el campo `data` al objeto `budgetInformation`
        this.metaBudgets = response.data.meta
        console.log("TABLA DE BUDGETS");
        console.log(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching budget information:', error);
      }
    });
  }

}
