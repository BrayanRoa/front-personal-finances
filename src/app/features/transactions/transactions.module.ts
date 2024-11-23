import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { FormTransactionComponent } from './components/form-transaction/form-transaction.component';
import { TransactionsCardComponent } from './components/transactions-card/transactions-card.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsComponent } from './page/transactions.component';

import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { UserHeaderComponent } from './components/user-header/user-header.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    FormTransactionComponent,
    TransactionsCardComponent,
    UserHeaderComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    TagModule,
  ],
  exports: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }
