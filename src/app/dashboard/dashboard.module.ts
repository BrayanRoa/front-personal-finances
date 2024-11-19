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
import { UserHeaderComponent } from './components/transactions/user-header/user-header.component';
import { TransactionTableComponent } from './components/transactions/transaction-table/transaction-table.component';
import { WalletCardComponent } from './components/main-dashboard/wallet-card/wallet-card.component';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { VerticalBarChartComponent } from './components/main-dashboard/vertical-bar-chart/vertical-bar-chart.component';
import { PolarBarChartComponent } from './components/main-dashboard/polar-bar-chart/polar-bar-chart.component';
import { BanksInformationComponent } from './components/main-dashboard/banks-information/banks-information.component';
import { BudgetsInformationComponent } from './components/main-dashboard/budgets-information/budgets-information.component';
import { ProgressBarModule } from 'primeng/progressbar';

import { ContextMenuModule } from 'primeng/contextmenu';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionsCardComponent } from './components/transactions/transactions-card/transactions-card.component';

@NgModule({
  declarations: [
    MainPageComponent,
    DashboardControlComponent,
    UserHeaderComponent,
    TransactionTableComponent,
    WalletCardComponent,
    VerticalBarChartComponent,
    PolarBarChartComponent,
    BanksInformationComponent,
    BudgetsInformationComponent,
    TransactionsComponent,
    TransactionsCardComponent
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
    ProgressBarModule,
    ContextMenuModule
  ],
  exports: [
    MainPageComponent,
  ]
})
export class DashboardModule { }
