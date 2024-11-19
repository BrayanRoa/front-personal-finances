import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainPageComponent } from '../auth/pages/auth-main-page/auth-main-page.component';
import { DashboardControlComponent } from './pages/dashboard-control/dashboard-control.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: 'control',
                component: DashboardControlComponent
            },
            {
                path: 'transactions',
                component: TransactionTableComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class DashboardRoutingModule { }
