import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Input() totalRecords!: number
  @Input() meta!: MetaData

  @Output() pageSelected = new EventEmitter<{ page: number, per_page: number }>

  currentStartIndex: number = 0; // Índice inicial
  currentEndIndex: number = 9;  // Índice final (10 botones visibles)
  currentPage: number = 1;      // Página actual

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
    console.log("PAGINATOR", page);
    this.currentPage = page;
    this.pageSelected.emit({ page: page, per_page: 10 });
  }

  // Avanza al siguiente conjunto de páginas
  nextPage() {
    if (this.currentEndIndex < this.totalRecords) {
      this.currentStartIndex++;
      this.currentEndIndex++;
    }
    const a = this.currentPage++
    console.log(a);
    this.selectPage(a);
  }

  // Retrocede al conjunto anterior de páginas
  previousPage() {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex--;
      this.currentEndIndex--;
    }
    const a = this.currentPage--
    console.log(a);
    this.selectPage(a);
  }
}
