import { Component, OnInit } from '@angular/core';
import { ApiResponse, MetaData } from '../../../shared/interfaces/common-response.interface';
import { DashboardService } from '../services/dashboard.service';
import { budgetData, budgetInformation, graphPolarity, graphVerticalData, summaryWalletsResponse } from '../../../shared/interfaces/dashboard/summary-wallets.interface';
import { WalletService } from '../../../core/service/wallet.service';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';

interface TableColumn {
  field: string;
  header: string;
}


@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.css']
})
export class DashboardControlComponent implements OnInit {
  walletSummary!: summaryWalletsResponse;
  barChartData: graphVerticalData[] = [];
  pieChartData: graphPolarity[] = [];
  budgets!: budgetData[];
  metaBudgets!: MetaData;
  bankDetails!: BanksInformation[];

  readonly DEFAULT_PAGE = 1;
  readonly DEFAULT_PER_PAGE = 5;

  tableColumns: TableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'limit_amount', header: 'Limit Amount' },
    { field: 'percentage', header: 'Percentage' },
  ];

  actions = [
    { label: '', icon: 'pi pi-pencil', callback: (row: any) => this.editRow(row) },
    { label: '', icon: 'pi pi-trash', callback: (row: any) => this.deleteRow(row) },
  ];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loadWalletSummary();
    this.loadBarChartData();
    this.loadPieChartData();
    this.loadBudgets(this.DEFAULT_PAGE, this.DEFAULT_PER_PAGE);
    this.loadBankDetails();
  }

  private loadWalletSummary(): void {
    this.dashboardService.summaryWallets().subscribe({
      next: (response) => { this.walletSummary = response.data; },
      error: (error) => this.handleError(error, 'Error fetching wallet summary'),
    });
  }

  private loadBarChartData(): void {
    const year = new Date().getFullYear();
    this.dashboardService.graphVertical(year.toString()).subscribe({
      next: (response) => { this.barChartData = response.data; },
      error: (error) => this.handleError(error, 'Error fetching bar chart data'),
    });
  }

  private loadPieChartData(): void {
    this.dashboardService.graphPolarity().subscribe({
      next: (response) => { this.pieChartData = response.data; },
      error: (error) => this.handleError(error, 'Error fetching pie chart data'),
    });
  }

  private loadBudgets(page: number, per_page: number): void {
    this.dashboardService.budgetInformation(page, per_page).subscribe({
      next: (response) => {
        this.budgets = response.data.budgets;
        this.metaBudgets = response.data.meta;
      },
      error: (error) => this.handleError(error, 'Error fetching budgets'),
    });
  }

  private loadBankDetails(): void {
    this.walletService.getBanksInformation().subscribe({
      next: (response) => { this.bankDetails = response.data; },
      error: (error) => this.handleError(error, 'Error fetching bank details'),
    });
  }

  private handleError(error: any, message: string): void {
    console.error(`${message}:`, error);
  }

  editRow(row: any): void {
    console.log('Editing row:', row);
  }

  deleteRow(row: any): void {
    console.log('Deleting row:', row);
  }

  onPageChange({ page, per_page }: { page: number; per_page: number }): void {
    this.loadBudgets(page, per_page);
  }
}
