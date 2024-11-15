import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
// import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardControlComponent } from './pages/dashboard-control/dashboard-control.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { WalletCardComponent } from './components/wallet-card/wallet-card.component';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { PolarBarChartComponent } from './components/polar-bar-chart/polar-bar-chart.component';


@NgModule({
  declarations: [
    MainPageComponent,
    DashboardControlComponent,
    UserHeaderComponent,
    TransactionTableComponent,
    WalletCardComponent,
    VerticalBarChartComponent,
    PolarBarChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DashboardRoutingModule,

    // OrderListModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule,
    TagModule,
    BadgeModule,
    AccordionModule,
    SplitButtonModule,
    DialogModule,
    SelectButtonModule,
    RippleModule,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    TableModule,
    ChartModule,
  ],
  exports: [
    MainPageComponent,
  ]
})
export class DashboardModule { }
