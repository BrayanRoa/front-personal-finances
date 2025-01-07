import { Component } from '@angular/core';
import { showModal } from '../sweet-alert-modal/sweet-alert-modal';
import moment from "moment";
import Swal from 'sweetalert2';

interface modal {
  title: string;
  text: string;
  icon: 'warning' | 'success' | 'error' | 'info' | 'question';
  confirmButtonText: string;

}

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.css'
})
export class BaseComponent {

  handleResponse(code: number, message: string): void {
    if (code === 200 || code === 201) {
      showModal({
        title: 'Success',
        text: message,
        icon: 'success',
        confirmButtonText: 'Accept'
      })
    }
    if (code === 400) {
      showModal({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Accept'
      })
    }
  }

  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      return result.isConfirmed; // Devuelve true si el usuario confirma, false si cancela
    });
  }

  confirmLogout(): Promise<boolean> {
    return Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, stay logged in"
    }).then((result) => {
      return result.isConfirmed; // Devuelve true si el usuario confirma, false si cancela
    });
  }


  showModal(option: modal) {
    return Swal.fire({
      title: option.title,
      text: option.text,
      icon: option.icon,
      showCancelButton: false,
      confirmButtonText: option.confirmButtonText,
      allowOutsideClick: false // Evita cerrar el modal al hacer clic fuera
    });
  }

  switchTransaction = (date: Date, repeat: string) => {
    let nextDate;
    switch (repeat) {
      case "EVERY DAY":
        nextDate = moment.utc(date).add(1, 'days');
        break;
      case "EVERY TWO DAYS":
        nextDate = moment.utc(date).add(2, 'days');
        break;
      case "EVERY WORKING DAY":
        const currentDay = moment.utc(date).isoWeekday(); // 1 (lunes) a 7 (domingo)
        nextDate = moment.utc(date);
        if (currentDay >= 5) {
          // Si es viernes o fin de semana, mueve al lunes
          nextDate = nextDate.isoWeekday(8); // Próximo lunes
        } else {
          // Día hábil normal
          nextDate.add(1, 'days');
        }
        break;

      case "EVERY WEEK":
        nextDate = moment.utc(date).add(1, 'weeks');
        break;
      case "EVERY TWO WEEKS":
        nextDate = moment.utc(date).add(2, 'weeks');
        break;
      case "EVERY MONTH":
        nextDate = moment.utc(date).add(1, 'months');
        break;
      case "EVERY TWO MONTHS":
        nextDate = moment.utc(date).add(2, 'months');
        break;
      case "EVERY THREE MONTHS":
        nextDate = moment.utc(date).add(3, 'months');
        break;
      case "EVERY SIX MONTHS":
        nextDate = moment.utc(date).add(6, 'months');
        break;
      case "EVERY YEAR":
        nextDate = moment.utc(date).add(1, 'years');
        break;
      case "NEVER":
        nextDate = null;
        break;
      default:
        throw new Error(`Invalid repeat value: ${repeat}`);
    }

    return nextDate?.toDate()
  }

}
