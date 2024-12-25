import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './page/budgets.component';

const routes: Routes = [
  { path: '', component: BudgetsComponent }, // Ruta raíz para el Dashboard
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
