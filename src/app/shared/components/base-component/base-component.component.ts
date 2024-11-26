import { Component } from '@angular/core';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.css'
})
export class BaseComponent {

  handleError(error: any, message: string): void {
    console.error(`${message}:`, error);
  }

}
