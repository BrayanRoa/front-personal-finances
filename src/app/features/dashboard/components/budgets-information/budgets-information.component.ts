import { Component, EventEmitter, Input, Output } from '@angular/core';
import { budgetData } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-budgets-information',
  templateUrl: './budgets-information.component.html',
  styleUrl: './budgets-information.component.css'
})
export class BudgetsInformationComponent {

  first: number = 0;
  rows: number = 5;
  @Input() budgetData!: budgetData[]
  @Input() meta!: MetaData
  @Output() paginate = new EventEmitter<{ page: number, per_page: number }>();

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginate.emit({
      page: event.page + 1, // para sincronizar correctamente con el paginador de PrimeNG
      per_page: this.rows,
    });
  }

}
