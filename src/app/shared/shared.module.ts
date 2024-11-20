import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports:[
    PaginatorComponent
  ]
})
export class SharedModule { }
