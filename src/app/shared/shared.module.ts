import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { TableComponent } from './components/table/table.component';

import { ButtonComponent } from './components/bottons/button/button.component';
import { DropDownComponent } from './components/bottons/drop-down/drop-down.component';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormComponent } from './components/form/form.component';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    PaginatorComponent,
    TableComponent,
    ButtonComponent,
    DropDownComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  exports: [
    PaginatorComponent,
    TableComponent,
    ButtonComponent,
    DropDownComponent,
    FormComponent
  ],
  providers: [provideNgxMask()]
})
export class SharedModule { }
