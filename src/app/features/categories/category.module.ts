import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './page/categories.component';
import { CategoryRoutingModule } from './category-routing.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { SharedModule } from '../../shared/shared.module';
import { FormCategoriesComponent } from './components/form-categories/form-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    FormCategoriesComponent,
    ListCategoriesComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PrimeNgModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CategoryModule { }
