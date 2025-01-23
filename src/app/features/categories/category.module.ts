import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './page/categories.component';
import { CategoryRoutingModule } from './category-routing.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class CategoryModule { }
