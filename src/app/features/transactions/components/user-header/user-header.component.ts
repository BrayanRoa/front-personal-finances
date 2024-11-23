import { Component, signal } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {

  isDropdownOpen = signal<boolean>(false);
  isDropdownOpenTwo = signal<boolean>(false);
  month: string = "January"

  toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  toggleDropdownTwo(): void {
    this.isDropdownOpenTwo.set(!this.isDropdownOpenTwo());
  }

  selectOption(option: string): void {
    console.log('Option selected:', option);
    this.month = option;
    this.isDropdownOpen.set(false); // Cierra el menú al seleccionar una opción
  }

}
