import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetRoutingModule } from './budget-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { BudgetsComponent } from './page/budgets.component';
import { SharedModule } from '../../shared/shared.module';
import { CakeCardComponent } from './components/cake-card-budget/cake-card.component';
import { AllBudgetsComponent } from './components/all-budgets/all-budgets.component';
import { FormBudgetComponent } from './components/form-budget/form-budget.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    BudgetsComponent,
    CakeCardComponent,
    AllBudgetsComponent,
    FormBudgetComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class BudgetsModule { }
