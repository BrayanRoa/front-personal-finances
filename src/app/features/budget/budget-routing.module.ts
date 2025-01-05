import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBudgetComponent } from './page/main-budget/main-budget.component';
import { InfoBudgetComponent } from './page/info-budget/info-budget.component';

const routes: Routes = [
  { path: '', component: MainBudgetComponent }, // Ruta raíz para el Dashboard
  { path: 'info/:id', component: InfoBudgetComponent }, // Ruta raíz para el Dashboard
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
