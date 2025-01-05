import { Component } from '@angular/core';
import { showModal } from '../sweet-alert-modal/sweet-alert-modal';
import moment from "moment";

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.css'
})
export class BaseComponent {

  // handleError(error: any, message: string): void {

  // }

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
