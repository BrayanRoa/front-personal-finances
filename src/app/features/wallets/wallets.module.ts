import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './pages/wallet.component';
import { WalletsRoutingModule } from './wallets-routing.module';
import { TableWalletsComponent } from './components/table-wallets/table-wallets.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { DoughnutChartWalletsComponent } from './components/doughnut-chart-wallets/doughnut-chart-wallets.component';
import { LinesChartWalletsComponent } from './components/lines-chart-wallets/lines-chart-wallets.component';
import { VerticalChartWalletsComponent } from './components/vertical-chart-wallets/vertical-chart-wallets.component';



@NgModule({
  declarations: [
    WalletComponent,
    TableWalletsComponent,
    DoughnutChartWalletsComponent,
    LinesChartWalletsComponent,
    VerticalChartWalletsComponent
  ],
  imports: [
    CommonModule,
    WalletsRoutingModule,
    SharedModule,
    PrimeNgModule
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletsModule { }
