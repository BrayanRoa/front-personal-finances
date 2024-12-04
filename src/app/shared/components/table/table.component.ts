import { Component, effect, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';
import { NOT_FOUND_MSG } from '../../constants/constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnChanges {
  // ** Inputs **
  @Input() data: any[] = []; // Datos de la tabla
  @Input() meta!: MetaData; // Metadatos de paginación
  @Input() columns: { field: string, header: string }[] = []; // Definición de columnas
  @Input() actions?: {
    label: string,
    icon?: string,
    color: 'help' | 'info' | 'danger' | 'warning' | 'secondary' | 'success' | 'contrast' | 'primary',
    callback: (row: any, data: any) => void
  }[]; // Acciones para cada fila
  @Input() cellTemplates: { [key: string]: TemplateRef<any> } = {}; // Templates personalizados
  @Input() numberRegistersByPage!: number; // Registros por página
  @ViewChild('appPaginator') paginatorComponent!: any; // Referencia al PaginatorComponent

  @Input() eventTrigger!: boolean;

  // ** Outputs **
  @Output() paginate = new EventEmitter<{ page: number, per_page: number, search: string }>();

  // ** Estado interno **
  search = signal<string>(""); // Búsqueda en tiempo real
  inputSearch: string = ''; // Entrada del campo de búsqueda
  isLoading = true; // Indica si se está cargando la tabla
  msgNotFound: string = NOT_FOUND_MSG; // Mensaje de "no encontrado"

  constructor() {
    // Reactividad de la búsqueda
    effect(() => {
      this.paginate.emit({
        page: 1, // Reinicia a la página 1 en cada búsqueda
        per_page: this.numberRegistersByPage,
        search: this.search()
      });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventTrigger']) {
      console.log("AJA CAMBIE", changes['eventTrigger']);
      this.meta.totalRecords -= 1
      this.paginatorComponent.resetPage(); // Reinicia la página en el paginator
    }
  }

  ngOnInit(): void {
    this.simulateLoading();
  }

  // ** Métodos de ciclo de vida y auxiliares **
  private simulateLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
      if (this.data.length === 0) {
        this.msgNotFound = NOT_FOUND_MSG;
      }
    }, 1000);
  }

  // ** Métodos públicos **
  handlePageChange(event: any): void {
    console.log("TABLE PAGINATOR", event);
    this.paginate.emit({
      page: event.page,
      per_page: event.per_page,
      search: this.search()
    });
  }

  handleSearchInputChange(): void {
    if (this.inputSearch.length >= 3) {
      this.search.set(this.inputSearch); // Actualiza búsqueda
    } else if (this.inputSearch.length === 0) {
      this.search.set(''); // Resetea búsqueda
    }
  }

  clearSearch(event: Event): void {
    event.preventDefault();
    this.inputSearch = ''; // Limpia el input
    this.handleSearchInputChange();
  }

  handleRowAction(id: number | string, icon?: string): void {
    // TODO: AQUI DEBO ENVIAR EL REGISTRO SOLO CUANDO SEA UN UPDATE PARA UN DELETE NO
    console.log("POR EEL CLICK", id, icon);
    const action = this.actions?.find(action => action.icon === icon);
    if (action) {
      action.callback(id, this.data.filter(action => action.id === id)[0]);

    }
  }

  updateData(action: boolean) {
    // if (action.icon === 'pi pi-trash') {
    if (action) {
      this.meta.totalRecords -= 1
      // if (this.paginatorComponent) {
      this.paginatorComponent.resetPage(); // Reinicia la página en el paginator
    }
    // }
    // }
  }

  getButtonClass(actionLabel: string): string {
    const buttonClasses: { [key: string]: string } = {
      Edit: 'edit-button', // Clase para editar
      Delete: 'delete-button' // Clase para eliminar
    };
    return buttonClasses[actionLabel] || '';
  }

  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  getGlobalIndex(index: number): number {
    const currentPage = this.meta?.currentPage || 1; // Página actual
    const perPage = this.numberRegistersByPage || 10; // Registros por página
    return (currentPage - 1) * perPage + (index + 1); // Cálculo del índice global
  }

}
