import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetRoutingModule } from './budget-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { BudgetsComponent } from './page/budgets.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    BudgetsComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
  ]
})
export class BudgetsModule { }
