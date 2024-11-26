import { Component, EventEmitter, Input, Output, SimpleChanges, Signal, signal, effect } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';
import { dropDowsn } from '../bottons/drop-down/drop-down.component';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Input() meta!: MetaData;
  @Input() numberRegistersByDefault!: number; // Valor inicial para registros por página
  @Output() pageSelected = new EventEmitter<{ page: number, per_page: number }>();

  options: dropDowsn[] = [];

  // Signals para el estado reactivo
  page = signal<number>(1);
  perPage = signal<number>(5); // Valor por defecto que será actualizado

  constructor() {
    // Efecto para emitir cambios al padre cuando se actualicen los signals
    effect(() => {
      this.pageSelected.emit({
        page: this.page(),
        per_page: this.perPage()
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Actualiza el signal `perPage` si cambia el valor de `numberRegisters`
    if (changes['numberRegistersByDefault'] && this.numberRegistersByDefault) {
      this.perPage.set(this.numberRegistersByDefault);
    }

    // Genera opciones si cambia la meta
    if (changes['meta'] && this.meta?.totalRecords) {
      this.generateRange(this.meta.totalPages);
      if(this.options.length === 0){
        this.generateOptions();
      }
    }
  }

  generateRange(end: number): number[] {
    return Array.from({ length: end }, (_, index) => index);
  }

  generateOptions() {
    this.options = [];
    for (let index = 1; index <= this.meta.totalPages; index++) {
      const data = this.perPage() * index; // Usa el valor actual del signal perPage
      this.options.push({ id: data, name: data.toString() });
    }
  }

  // Cambiar página
  selectPage(page: number) {
    this.page.set(page); // Actualizamos el signal de página
  }

  // Cambiar el número de registros por página
  selectPerPage(option:{id: string | number, name: string}) {
    this.page.set(1)
    this.perPage.set(+option.id); // Actualizamos el signal de registros por página
  }

  // Avanza al siguiente conjunto de páginas
  nextPage() {
    if (this.meta.currentPage < this.meta.totalPages) {
      this.page.set(this.meta.currentPage + 1);
    }
  }

  // Retrocede al conjunto anterior de páginas
  previousPage() {
    if (this.meta.currentPage > 1) {
      this.page.set(this.meta.currentPage - 1);
    }
  }

  firstPage() {
    this.page.set(1);
  }

  lastPage() {
    this.page.set(this.meta.totalPages);
  }
}
