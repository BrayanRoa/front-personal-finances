import { Component, effect, EventEmitter, Input, OnInit, Output, signal, TemplateRef } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';
import { NOT_FOUND_MSG } from '../../constants/constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input() columns: { field: string, header: string }[] = []; // Definición de columnas
  @Input() data: any[] = []; // Datos de la tabla
  @Input() actions?: { label: string, icon?: string, callback: (row: any) => void }[];
  @Input() cellTemplates: { [key: string]: TemplateRef<any> } = {}; // Recibir templates personalizados para las columnas
  // TemplateRef es un tipo especial en Angular que representa una plantilla reutilizable.

  @Input() meta!: MetaData
  @Input() numberRegistersByPage!: number
  @Output() paginate = new EventEmitter<{ page: number, per_page: number, search: string }>();
  search = signal<string>("")

  isLoading = true;
  msg_not_found: string = NOT_FOUND_MSG

  inputSearch: string = '';

  constructor() {
    effect(() => {
      const currentSearch = this.search();
      this.paginate.emit({
        page: 1, // Reinicia siempre a la página 1 cuando cambia el search
        per_page: this.numberRegistersByPage,
        search: currentSearch
      });
    });

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      if (this.data.length === 0) {
        this.msg_not_found = NOT_FOUND_MSG;
      }
    }, 1000)
  }
  onPageChange(event: any) {
    this.paginate.emit({
      page: event.page, // para sincronizar correctamente con el paginador de PrimeNG
      per_page: event.per_page,
      search: this.search()
    });
  }

  checkInput() {
    if (this.inputSearch.length >= 3) {
      this.search.set(this.inputSearch); // Actualiza el valor
    } else if (this.inputSearch.length === 0) {
      this.search.set(''); // Resetea a un valor vacío si corresponde
    }
  }

  clearSearch(event: Event): void {
    event.preventDefault(); // Previene la acción por defecto del enlace
    this.inputSearch = ''; // Limpia el contenido del input
    this.checkInput(); // Llama a tu lógica para manejar el cambio
  }


  getButtonClass(actionLabel: string): string {
    if (actionLabel === 'Edit') {
      return 'edit-button';  // Clase para el botón de editar (azul)
    } else if (actionLabel === 'Delete') {
      return 'delete-button';  // Clase para el botón de eliminar (rojo)
    }
    return '';  // Si no es 'Edit' ni 'Delete', no asigna clase
  }

  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

}
