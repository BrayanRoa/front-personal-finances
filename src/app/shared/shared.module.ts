import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { ButtonModule } from 'primeng/button';
import { TableComponent } from './components/table/table.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonComponent } from './components/bottons/button/button.component';
import { DropDownComponent } from './components/bottons/drop-down/drop-down.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    TableComponent,
    ButtonComponent,
    DropDownComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ProgressBarModule,

  ],
  exports: [
    PaginatorComponent,
    TableComponent,
    ButtonComponent,
    DropDownComponent,
  ]
})
export class SharedModule { }
