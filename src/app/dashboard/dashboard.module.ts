import { NgModule } from '@angular/core';
import { MainPageDashboardComponent } from './pages/main-page-dashboard/main-page-dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministrationRoutingModule } from './adinistration.routing.module';
import { CardsInformationComponent } from './components/cards-information/cards-information.component';
import { DashboardControlComponent } from './pages/dashboard-control/dashboard-control.component';
import { HeaderInformationComponent } from './components/header-information/header-information.component';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
    imports: [
        RouterModule,
        AdministrationRoutingModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        MultiSelectModule,
        OrderListModule,
        CommonModule,
        PaginatorModule,
        IconFieldModule,
        InputIconModule,
        TagModule,
        BadgeModule,
        AccordionModule,
        ReactiveFormsModule
    ],
    exports: [
        MainPageDashboardComponent
    ],
    declarations: [
        MainPageDashboardComponent,
        CardsInformationComponent,
        DashboardControlComponent,
        HeaderInformationComponent,
        ListTransactionsComponent,
        ListCategoriesComponent,
        CardsInformationComponent,
        HeaderInformationComponent,
    ],
    providers: [],
})
export class DashboardModule { }
