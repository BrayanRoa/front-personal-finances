import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsComponent } from './page/transactions.component';

import { UserHeaderComponent } from './components/user-header/user-header.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    TransactionsComponent,
    UserHeaderComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
  ],
  exports: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }
