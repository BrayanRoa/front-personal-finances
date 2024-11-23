import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent {

  // modal
  visible: boolean = false;

  first: number = 0;
  rows: number = 10;
  @Input() transactions: Transaction[] = [];
  @Input() meta!: MetaData

  @Output() search = new EventEmitter<string>();
  @Output() paginate = new EventEmitter<{ page: number, per_page: number }>();
  @Output() filter = new EventEmitter<{ month: number, year: number }>();

  onPageChange(event: any) {
    console.log("TRANSACTION TABLE");
    this.first = event.first;
    this.rows = event.rows;
    this.paginate.emit({
      page: event.page + 1, // para sincronizar correctamente con el paginador de PrimeNG
      per_page: event.per_page,
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;  // Asegura que el target es un input
    const searchTerm = input.value;
    console.log(searchTerm);
    if (searchTerm.length >= 3) {
      this.search.emit(searchTerm);
    } else {
      this.search.emit('');
    }
  }

  showModal(){
    this.visible = true;
  }


}
