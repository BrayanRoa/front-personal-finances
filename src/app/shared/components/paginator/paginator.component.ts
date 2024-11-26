import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Input() meta!: MetaData
  @Input() numberRegisters!: number;
  @Output() pageSelected = new EventEmitter<{ page: number, per_page: number }>
  currentStartIndex: number = 1; // Índice inicial

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['meta'] && this.meta?.totalRecords) {
      this.generateRange(this.meta.totalPages);
    }
  }

  generateRange(end: number): number[] {
    return Array.from({ length: end }, (_, index) => index);
  }

  // Selecciona una página
  selectPage(page: number) {
    this.pageSelected.emit({ page: page, per_page: this.numberRegisters });
  }

  // Avanza al siguiente conjunto de páginas
  nextPage() {
    if (this.meta.currentPage < this.meta.totalPages) {
      this.selectPage(this.meta.currentPage);
    }
  }

  // Retrocede al conjunto anterior de páginas
  previousPage() {
    if (this.meta.currentPage >= 2) {
      const page = this.meta.currentPage - 2;
      this.selectPage(page);
    }
  }

  firstPage() {
    this.selectPage(0);
  }

  lastPage() {
    this.selectPage(this.meta.totalPages-1)
  }
}
