import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ChartModule,
    TableModule,
    PaginatorModule,
    PanelModule,
    InputNumberModule,
    TagModule
  ],
  exports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ChartModule,
    TableModule,
    PaginatorModule,
    PanelModule,
    InputNumberModule,
    TagModule
  ]
})
export class PrimeNgModule { }
