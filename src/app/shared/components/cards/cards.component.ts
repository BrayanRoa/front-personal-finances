import { Component, Input, OnInit } from '@angular/core';
import { SummaryInterface } from '../../interfaces/generic-components/form.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{
  
  isLoading: boolean = true;
  
  @Input()
  cardsInfo: SummaryInterface[] = []
  
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000)
  }

}
