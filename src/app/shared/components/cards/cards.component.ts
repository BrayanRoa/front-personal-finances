import { Component, Input } from '@angular/core';
import { SummaryInterface } from '../../interfaces/generic-components/form.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  @Input()
  cardsInfo: SummaryInterface[] = []

}
