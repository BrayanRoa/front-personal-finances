import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { SplitButtonModule } from 'primeng/splitbutton';


@NgModule({
  exports: [
    ButtonModule,
    ProgressBarModule,
    DialogModule,
    DropdownModule,
    ChartModule,
    TableModule,
    PaginatorModule,
    InputNumberModule,
    TagModule,
    ProgressSpinnerModule,
    MessagesModule,
    PanelModule,
    PanelMenuModule,
    BadgeModule,
    SplitButtonModule
  ]
})
export class PrimeNgModule { }
