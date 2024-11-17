import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { budgetInformation } from '../../interfaces/dashboard/summary-wallets.interface';

interface Product{
  code:string;
  name: string;
  category:string;
  quantity:number;
}

@Component({
  selector: 'app-budgets-information',
  templateUrl: './budgets-information.component.html',
  styleUrl: './budgets-information.component.css'
})
export class BudgetsInformationComponent {
  @Input() budgetData!: budgetInformation[]
  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes["budgetData"] && changes["budgetData"].currentValue){

  //   }
  // }


  products:Product[] =[]
  ngOnInit(): void {
  }

}
