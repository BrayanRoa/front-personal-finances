import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './page/categories.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent }, // Ruta raíz para el Dashboard
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
