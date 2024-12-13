import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('../features/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('../features/wallets/wallets.module').then(
            (m) => m.WalletsModule
          ),
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full' // Ruta por defecto
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
