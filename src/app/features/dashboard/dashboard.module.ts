import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BanksInformationComponent } from './components/banks-information/banks-information.component';
import { PolarBarChartComponent } from './components/polar-bar-chart/polar-bar-chart.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { WalletCardComponent } from './components/wallet-card/wallet-card.component';
import { DashboardControlComponent } from './page/dashboard-control.component';

// For dynamic progressbar demo
import { SharedModule } from '../../shared/shared.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { BalanceLineChartComponent } from './components/balance-line-chart/balance-line-chart.component';

@NgModule({
  declarations: [
    DashboardControlComponent,
    BanksInformationComponent,
    PolarBarChartComponent,
    VerticalBarChartComponent,
    WalletCardComponent,
    HorizontalBarComponent,
    BalanceLineChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PrimeNgModule
  ],
  exports: [
    DashboardControlComponent
  ]
})
export class DashboardModule { }
