import { Component } from '@angular/core';
import { showModal } from '../sweet-alert-modal/sweet-alert-modal';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';


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
    if (code === 0) {
      showModal({
        title: 'Warning',
        text: message,
        icon: 'warning',
        confirmButtonText: 'Accept'
      })
    }
    if (code === 200 || code === 201) {
      showModal({
        title: 'Success',
        text: message,
        icon: 'success',
        confirmButtonText: 'Accept'
      })
    }
    if (code === 400 || code === 404 || code === 409) {
      showModal({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Accept'
      })
    }
  }

  async confirmDelete(): Promise<boolean> {
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

  async confirmLogout(): Promise<boolean> {
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

  async confirmAction() {
    return Swal.fire({
      title: 'Email Not Verified',
      text: 'Your email has not been verified yet. Would you like to verify it now?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verify now',
      cancelButtonText: 'No, later'
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
    let nextMonthStart
    switch (repeat) {
      case "EVERY DAY":
        nextDate = dayjs(date).add(1, 'days');
        break;
      case "EVERY TWO DAYS":
        nextDate = dayjs(date).add(2, 'days');
        break;
      case "EVERY WORKING DAY":
        const currentDay = dayjs(date).isoWeekday(); // 1 (lunes) a 7 (domingo)
        nextDate = dayjs(date);
        if (currentDay >= 5) {
          // Si es viernes o fin de semana, mueve al lunes
          nextDate = nextDate.isoWeekday(8); // Próximo lunes
        } else {
          // Día hábil normal
          nextDate = nextDate.add(1, 'day');
        }
        break;

      case "EVERY WEEK":
        nextMonthStart = dayjs(date).add(1, 'week');
        break;
      case "EVERY TWO WEEKS":
        nextMonthStart = dayjs(date).add(2, 'week');
        break;
      case "EVERY MONTH":
        nextMonthStart = dayjs(date).add(1, 'month');
        break;
      case "EVERY TWO MONTHS":
        nextMonthStart = dayjs(date).add(2, 'month');
        break;
      case "EVERY THREE MONTHS":
        nextMonthStart = dayjs(date).add(3, 'month');
        break;
      case "EVERY SIX MONTHS":
        nextMonthStart = dayjs(date).add(6, 'month');
        break;
      case "EVERY YEAR":
        nextDate = dayjs(date).add(1, 'year').subtract(1, 'day');
        break;
      case "NEVER":
        nextDate = null;
        break;
      default:
        throw new Error(`Invalid repeat value: ${repeat}`);
    }
    nextDate = nextMonthStart!.subtract(1, 'day'); // Último día del mes actual
    return nextDate?.toDate()
  }

}
