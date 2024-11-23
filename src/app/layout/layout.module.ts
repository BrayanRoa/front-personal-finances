import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';

import { MainPageComponent } from './page/main-page.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../features/dashboard/dashboard.module';


@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    DashboardModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class LayoutModule { }
