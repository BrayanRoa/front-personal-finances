import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './page/transactions.component';
import { walletsData } from './resolvers/transactions.resolver';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    resolve: { walletsData: walletsData }
  }, // Ruta raíz para el Dashboard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
