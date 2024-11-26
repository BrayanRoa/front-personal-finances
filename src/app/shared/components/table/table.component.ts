import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
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

  @Input() meta!: MetaData
  @Input() numberRegistersByPage!: number
  @Output() paginate = new EventEmitter<{ page: number, per_page: number }>();

  isLoading = true;
  msg_not_found: string = NOT_FOUND_MSG
  // TemplateRef es un tipo especial en Angular que representa una plantilla reutilizable.
  @Input() cellTemplates: { [key: string]: TemplateRef<any> } = {}; // Recibir templates personalizados para las columnas

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      if (this.data.length === 0) {
        this.msg_not_found = NOT_FOUND_MSG;
      }
    }, 1000)
  }
  onPageChange(event: any) {
    console.log("TRANSACTION TABLE");
    this.paginate.emit({
      page: event.page + 1, // para sincronizar correctamente con el paginador de PrimeNG
      per_page: event.per_page,
    });
  }

  getButtonClass(actionLabel: string): string {
    console.log("LABEL", actionLabel);
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
