import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MetaData } from '../../interfaces/common-response.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() columns: { field: string, header: string }[] = []; // Definición de columnas
  @Input() data: any[] = []; // Datos de la tabla
  @Input() actions?: { label: string, icon?: string, callback: (row: any) => void }[];

  @Input() meta!: MetaData
  @Input() numberRegistersByPage!: number
  @Output() paginate = new EventEmitter<{ page: number, per_page: number }>();

  // TemplateRef es un tipo especial en Angular que representa una plantilla reutilizable.
  @Input() cellTemplates: { [key: string]: TemplateRef<any> } = {}; // Recibir templates personalizados para las columnas

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
