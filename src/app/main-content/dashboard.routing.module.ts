import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardControlComponent } from './pages/dashboard-control/dashboard-control.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

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
                component: TransactionsComponent
            },
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            // Ruta comodín para manejar páginas no encontradas
            { path: '**', redirectTo: 'control' }
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
