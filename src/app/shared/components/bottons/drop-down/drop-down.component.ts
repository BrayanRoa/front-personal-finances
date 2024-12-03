import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

export interface DropdownOption {
  id: number | string;
  name: string;
}

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent {

  @Input() titleDropDown: string = ""
  @Input() optionsDropDown: DropdownOption[] = []
  @Input() severity: 'help' | 'info' | 'danger' | 'warning' | 'secondary' | 'success' | 'contrast' | 'primary' = 'primary';

  @Output() onChange = new EventEmitter<({ id: number | string, name: string })>;

  isDropdownOpen = signal<boolean>(false);
  optionsSelected: string = "January"

  toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  selectOption(option: DropdownOption): void {
    this.optionsSelected = option.name;
    // this.titleDropDown = option.name;
    this.onChange.emit({ id: option.id, name: option.name }); // Emitimos el evento al padre para actualizar el valor seleccionado en el componente padre.
    this.isDropdownOpen.set(false); // Cierra el menú al seleccionar una opción
  }

}
