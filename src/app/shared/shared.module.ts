import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { TableComponent } from './components/table/table.component';

import { ButtonComponent } from './components/bottons/button/button.component';
import { DropDownComponent } from './components/bottons/drop-down/drop-down.component';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
@NgModule({
  declarations: [
    PaginatorComponent,
    TableComponent,
    ButtonComponent,
    DropDownComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    FormsModule,
    PrimeNgModule
  ],
  exports: [
    PaginatorComponent,
    TableComponent,
    ButtonComponent,
    DropDownComponent,
  ]
})
export class SharedModule { }
