import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';

import { MainPageComponent } from './page/main-page.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../features/dashboard/dashboard.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


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
    PrimeNgModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class LayoutModule { }
