import { Component, OnInit } from '@angular/core';
import { ApiResponse, MetaData } from '../../../shared/interfaces/common-response.interface';
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

  // PRUEBAS PARA TABLAS DINAMICAS
  tableColumns = [
    { field: 'name', header: 'Name' },
    { field: 'limit_amount', header: 'Limit Amount' },
    { field: 'percentage', header: 'Percentage' },
  ];

  actions = [
    { label: 'Edit', callback: (row: any) => this.editRow(row) },
    { label: 'Delete', callback: (row: any) => this.deleteRow(row) },
  ];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.loadSummaryWallets();
    this.loadGraphVertical();
    this.loadGraphPolarity();
    this.loadBudgetInformation(1, 5);
    this.loadBanksInformations()
    // this.loadTransactions(1, 10);
  }


  editRow(row: any) {
    console.log('Editing row:', row);
  }

  deleteRow(row: any) {
    console.log('Deleting row:', row);
  }

  onPageChange(data: { page: number, per_page: number }): void {
    console.log("llegue", data);
    this.loadBudgetInformation(data.page, data.per_page);
  }

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
  loadBudgetInformation(page: number, per_page: number) {
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
