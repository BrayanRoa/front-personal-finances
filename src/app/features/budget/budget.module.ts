import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetRoutingModule } from './budget-routing.module';
import { FormAddUpdateBudgetComponent } from './components/form-add-update-budget/form-add-update-budget.component';
import { AllActiveBudgetsComponent } from './components/all-active-budgets/all-active-budgets.component';
import { MainBudgetComponent } from './page/main-budget/main-budget.component';
import { SharedModule } from '../../shared/shared.module';
import { InfoBudgetComponent } from './page/info-budget/info-budget.component';
import { CakeCardComponent } from './components/cake-card-budget/cake-card.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BudgetCardsComponent } from './components/budget-cards/budget-cards.component';



@NgModule({
  declarations: [
    FormAddUpdateBudgetComponent,
    AllActiveBudgetsComponent,
    MainBudgetComponent,
    InfoBudgetComponent,
    CakeCardComponent,
    BudgetCardsComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    BudgetRoutingModule,
    SharedModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]

})
export class BudgetModule { }
