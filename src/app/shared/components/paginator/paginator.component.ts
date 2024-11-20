import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  // @Input() totalRecords!: number
  @Input() meta!: MetaData

  @Output() pageSelected = new EventEmitter<{ page: number, per_page: number }>

  currentStartIndex: number = 1; // Índice inicial
  // currentEndIndex: number = 9;  // Índice final (10 botones visibles)
  // currentPage: number = 1;      // Página actual

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
    // this.currentPage = page;
    this.pageSelected.emit({ page: page, per_page: 5 });
  }

  // Avanza al siguiente conjunto de páginas
  nextPage() {
    // console.log(this.currentEndIndex);
    console.log(this.meta.totalPages);
    console.log(this.currentStartIndex);
    if (this.meta.currentPage < this.meta.totalPages) {
      // this.currentStartIndex++;

      this.selectPage(this.meta.currentPage);
    }
    console.log(this.currentStartIndex);
    // const a = this.currentPage++
    // console.log(a);
  }

  // Retrocede al conjunto anterior de páginas
  previousPage() {
    if (this.meta.currentPage >= 2) {
      console.log(this.meta.currentPage);
      const page = this.meta.currentPage - 2;
      console.log("PAGE: " + page);
      this.selectPage(page);
    }
  }
}
