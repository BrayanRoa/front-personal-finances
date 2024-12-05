import { Component, OnInit, signal } from '@angular/core';
import { MetaData } from '../../../shared/interfaces/common-response.interface';
import { DashboardService } from '../services/dashboard.service';
import { budgetData, graphPolarity, graphVerticalData, summaryWalletsResponse } from '../../../shared/interfaces/dashboard/summary-wallets.interface';
import { CoreService } from '../../../core/service/core.service';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { TransactionService } from '../../transactions/services/transaction.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { actionsButton } from '../../../shared/interfaces/use-common.interfce';
import { DropdownOption } from '../../../shared/components/bottons/drop-down/drop-down.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/service/theme.service';

interface TableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.css']
})
export class DashboardControlComponent extends BaseComponent implements OnInit {

  walletSummary!: summaryWalletsResponse;
  barChartData = signal<graphVerticalData[]>([]);
  pieChartData = signal<graphPolarity[]>([]);
  budgets = signal<budgetData[]>([]);
  metaBudgets!: MetaData;
  bankDetails = signal<BanksInformation[]>([]);
  years = signal<DropdownOption[]>([]);
  selectedYear = signal<number>(new Date().getFullYear()); // Año inicial por defecto

  readonly DEFAULT_PAGE = 1;
  readonly DEFAULT_PER_PAGE = 5;

  tableColumns: TableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'limit_amount', header: 'Limit Amount' },
    { field: 'percentage', header: 'Percentage' },
  ];

  // TODO: CAMBIAE ESE ANY POR EL TIPO DE DATO PARA EDITAR EL REGISTRO
  actions: actionsButton<any>[] = [
    { label: '', icon: 'pi pi-pencil', type: "button", color: "primary", callback: (row: any) => this.editRow(row) },
    { label: '', icon: 'pi pi-trash', type: "button", color: "danger", callback: (row: any) => this.deleteRow(row) },
  ];

  private themeSubscription!: Subscription;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly coreService: CoreService,
    private readonly transactionService: TransactionService,
    private themeService: ThemeService
  ) {
    super()
  }

  ngOnInit(): void {
    this.loadDashboardData();

    // Escuchar cambios de tema
    this.themeSubscription = this.themeService.themeChange$.subscribe(() => {
      this.refreshCharts(); // Actualizar los gráficos
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private refreshCharts(): void {
    // Recarga o actualiza los datos necesarios para los gráficos
    this.loadBarChartData();
    this.loadPieChartData();
    this.loadBankDetails()
  }

  private loadDashboardData(): void {
    this.loadYears();
    this.loadWalletSummary();
    this.loadBarChartData();
    this.loadPieChartData();
    this.loadBudgets(this.DEFAULT_PAGE, this.DEFAULT_PER_PAGE);
    this.loadBankDetails();
  }

  private loadWalletSummary(): void {
    this.dashboardService.summaryWallets().subscribe({
      next: (response) => { this.walletSummary = response.data; },
      error: (error) => this.handleResponse(error, 'Error fetching wallet summary'),
    });
  }

  private loadBarChartData(): void {
    const yearDefault = this.selectedYear();
    this.dashboardService.graphVertical(yearDefault.toString()).subscribe({
      next: (response) => { this.barChartData.set(response.data) },
      error: (error) => this.handleResponse(error, 'Error fetching bar chart data'),
    });
  }

  private loadPieChartData(): void {
    this.dashboardService.graphPolarity().subscribe({
      next: (response) => { this.pieChartData.set(response.data) },
      error: (error) => this.handleResponse(error, 'Error fetching pie chart data'),
    });
  }

  private loadBudgets(page: number, per_page: number): void {
    this.dashboardService.budgetInformation(page, per_page).subscribe({
      next: (response) => {
        this.budgets.set(response.data.budgets);
        this.metaBudgets = response.data.meta;
      },
      error: (error) => this.handleResponse(error, 'Error fetching budgets'),
    });
  }

  private loadBankDetails(): void {
    this.coreService.getBanksInformation().subscribe({
      next: (response) => { this.bankDetails.set(response.data) },
      error: (error) => this.handleResponse(error, 'Error fetching bank details'),
    });
  }

  private loadYears() {
    this.transactionService.getYears().subscribe({
      next: (response) => {
        const years = response.data.map((year) => ({ id: year, name: year.toString() }))
        this.years.set(years)
      },
      error: (error) => this.handleResponse(error, 'Error fetching years'),
    })
  }

  onChangeYear(year: number) {
    this.selectedYear.set(year);
    this.loadBarChartData()
  }
  onPageChange({ page, per_page }: { page: number; per_page: number }): void {
    this.loadBudgets(page, per_page);
  }

  editRow(row: any): void {
    // console.log('Editing row:', row);
  }

  deleteRow(row: any): void {
    // console.log('Deleting row:', row);
  }

}
