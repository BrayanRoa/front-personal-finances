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
import { MONTHS, NOT_FOUND_MSG } from '../../../shared/constants/constants';

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
  msgNotFound: string = NOT_FOUND_MSG; // Mensaje de "no encontrado"

  // GRAPH DATA
  // walletSummary!: summaryWalletsResponse | null;
  walletSummary = signal<summaryWalletsResponse>({
    budgetsActives:0,
    totalExpenses:0,
    totalIncome:0,
    totalTransactions:0
  });
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
  ) {
    super()
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadDashboardData();
    }, 500);

    this.nameMonths = MONTHS.map(month => {
      return month.shortcut!
    })
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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
      next: (response) => { 
        // this.walletSummary.set(response.data) 
        this.walletSummary.set(response.data)
        console.log(this.walletSummary());
      },
      error: (error) => this.handleResponse(error, 'Error fetching wallet summary'),
    });
  }

  private loadBarChartData(): void {
    const yearDefault = this.selectedYear();
    this.dashboardService.graphVertical(yearDefault.toString()).subscribe({
      next: (response) => {
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
