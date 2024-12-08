import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { budgetData, graphPolarityData, graphVerticalData, summaryWalletsResponse } from '../../../shared/interfaces/dashboard/summary-wallets.interface';
import { CoreService } from '../../../core/service/core.service';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { TransactionService } from '../../transactions/services/transaction.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { DropdownOption } from '../../../shared/components/bottons/drop-down/drop-down.component';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/service/theme.service';
import { MONTHS } from '../../../shared/constants/constants';

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

  private themeSubscription!: Subscription;

  // GRAPH DATA
  walletSummary!: summaryWalletsResponse;
  verticalChartData = signal<graphVerticalData[]>([]);
  polarChartData = signal<graphPolarityData[]>([]);
  budgets = signal<budgetData[]>([]);
  balanceChartData = signal<graphVerticalData[]>([]);
  bankDetails = signal<BanksInformation[]>([]);

  // YEAR DATA
  years = signal<DropdownOption[]>([]);
  selectedYear = signal<number>(new Date().getFullYear()); // Año inicial por defecto

  // MONTH DATA
  nameMonths: string[] = []

  readonly DEFAULT_PAGE = 1;
  readonly DEFAULT_PER_PAGE = 5;


  constructor(
    private readonly dashboardService: DashboardService,
    private readonly coreService: CoreService,
    private readonly transactionService: TransactionService,
    private themeService: ThemeService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.loadDashboardData();

    this.nameMonths = MONTHS.map(month => {
      return month.shortcut!
    })
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
    this.loadBudgets(this.DEFAULT_PAGE, this.DEFAULT_PER_PAGE)
  }

  private loadDashboardData(): void {
    this.loadYears();
    this.loadWalletSummary();
    this.loadBarChartData();
    this.loadPieChartData();
    this.loadBudgets(this.DEFAULT_PAGE, this.DEFAULT_PER_PAGE);
    this.loadBankDetails();
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

  private loadWalletSummary(): void {
    this.dashboardService.summaryWallets().subscribe({
      next: (response) => { this.walletSummary = response.data; },
      error: (error) => this.handleResponse(error, 'Error fetching wallet summary'),
    });
  }

  private loadBarChartData(): void {
    const yearDefault = this.selectedYear();
    this.dashboardService.graphVertical(yearDefault.toString()).subscribe({
      next: (response) => {
        console.log("aaaaaaa");
        this.verticalChartData.set(response.data)
        this.balanceByMonth()
      },
      error: (error) => this.handleResponse(error, 'Error fetching bar chart data'),
    });
  }

  private balanceByMonth() {
    // Accede directamente al valor del signal
    const chartData = this.verticalChartData(); // Llama al signal directamente

    // Verifica si chartData es un array y tiene datos
    if (!Array.isArray(chartData) || chartData.length === 0) {
      console.error("verticalChartData no es un array o está vacío");
      return;
    }

    let data: any[] = [];

    // Itera sobre los datos
    for (let i = 0; i <= chartData.length - 1; i++) {
      const currentMonth = chartData[i];
      const nextMonth = chartData[i + 1];

      data.push({
        total: currentMonth.total - nextMonth.total,
        month: currentMonth.month
      });
      i++

    }
    console.log("$$$$$$$", data);
    this.balanceChartData.set(data)
  }




  private loadPieChartData(): void {
    this.dashboardService.graphPolarity().subscribe({
      next: (response) => { this.polarChartData.set(response.data) },
      error: (error) => this.handleResponse(error, 'Error fetching pie chart data'),
    });
  }

  private loadBudgets(page: number, per_page: number): void {
    this.dashboardService.budgetInformation(page, per_page).subscribe({
      next: (response) => {
        this.budgets.set(response.data.budgets);
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

  onChangeYear(year: number) {
    this.selectedYear.set(year);
    this.loadBarChartData()
  }
}
