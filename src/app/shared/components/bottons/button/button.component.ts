import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() label: string = 'Button'; // Texto del botón
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Tipo del botón
  @Input() isDisabled: boolean = false; // Deshabilitar el botón
  @Input() icon?: string; // Clase del icono (ej. FontAwesome o PrimeIcons)
  @Input() severity: 'help' | 'info' | 'danger' | 'warning' | 'secondary' | 'success' | 'contrast' | 'primary' = 'primary';
  @Output() onClick = new EventEmitter<Event>(); // Emite un evento al hacer clic

  handleClick(event: Event) {
    if (!this.isDisabled) {
      this.onClick.emit(event); // Emite el evento solo si no está deshabilitado
    }
  }

  // OJO ESTO LO DEJO COMENTADO PA
  // @Input() color: 'primary' | 'secondary' | 'danger' | 'success' = 'primary'; // Estilo del botón
}
