import { Component } from '@angular/core';
import { showModal } from '../sweet-alert-modal/sweet-alert-modal';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.css'
})
export class BaseComponent {

  // handleError(error: any, message: string): void {
    
  // }

  handleResponse(code:number, message:string): void {
    if(code===200 || code === 201 ){
      showModal({
        title: 'Success',
        text: message,
        icon: 'success',
        confirmButtonText: 'Accept'
      })
    }
    if(code === 400){
      showModal({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Accept'
      })
    }
  }

}
