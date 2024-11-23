import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardControlComponent } from './page/dashboard-control.component';

const routes: Routes = [
  { path: '', component: DashboardControlComponent }, // Ruta raíz para el Dashboard
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
