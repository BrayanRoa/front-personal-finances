import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { ButtonModule } from 'primeng/button';
import { TableComponent } from './components/table/table.component';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    PaginatorComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ProgressBarModule,

  ],
  exports: [
    PaginatorComponent,
    TableComponent
  ]
})
export class SharedModule { }
