import { Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { SummaryInterface } from '../../interfaces/generic-components/form.interface';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnChanges {

  @ViewChildren('valueElement') valueElements!: QueryList<any>;

  @Input()
  cardsInfo: SummaryInterface[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardsInfo'] && changes['cardsInfo'].currentValue) {
      setTimeout(() => this.animateCards(), 0); // Asegura que el DOM esté actualizado
    }
  }

  ngAfterViewInit(): void {
    // Escucha cambios en el QueryList (por si cambia después de la carga inicial)
    this.valueElements.changes.subscribe(() => {
      this.animateCards();
    });
  }

  private animateCards(): void {
    if (!this.valueElements || this.valueElements.length === 0) return;

    this.valueElements.forEach((element: any, index: number) => {
      const value = this.cardsInfo[index].value;
      const countUp = new CountUp(element.nativeElement, value, {
        duration: 2,
        separator: ',',
        prefix: this.cardsInfo[index].useCurrency ? '$' : '',
      });

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }
}
