import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BanksInformationComponent } from './components/banks-information/banks-information.component';
import { BudgetsInformationComponent } from './components/budgets-information/budgets-information.component';
import { PolarBarChartComponent } from './components/polar-bar-chart/polar-bar-chart.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { WalletCardComponent } from './components/wallet-card/wallet-card.component';
import { DashboardControlComponent } from './page/dashboard-control.component';

import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
// For dynamic progressbar demo
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardControlComponent,
    BanksInformationComponent,
    BudgetsInformationComponent,
    PolarBarChartComponent,
    VerticalBarChartComponent,
    WalletCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ProgressBarModule,
    SharedModule,
    ChartModule,
    TableModule,
    PaginatorModule
  ],
  exports: [
    DashboardControlComponent
  ]
})
export class DashboardModule { }
