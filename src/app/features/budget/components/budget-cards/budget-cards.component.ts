import { Component, Input, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { SummaryInterface } from '../../../../shared/interfaces/generic-components/form.interface';
import { CountUp } from 'countup.js';
import { ISummaryBudget } from '../../interfaces/summary-budget.interface';

@Component({
  selector: 'app-budget-cards',
  templateUrl: './budget-cards.component.html',
  styleUrl: './budget-cards.component.css'
})
export class BudgetCardsComponent {

  @ViewChildren('valueElement') valueElements!: QueryList<any>;

  isLoading: boolean = true;

  @Input()
  budgetSummary!: ISummaryBudget | null; // Asegurar que pueda ser null inicialmente

  cardsInfo: SummaryInterface[] = [
    {
      id: "totalBudget",
      title: "Total Budgets",
      icon: "pi pi-money-bill",
      value: 0,
      cardImg: 'total-incomes',
      idTitle: 'title-one',
      idValue: 'amount-one',
      useCurrency: true
    },
    {
      id: "totalSpent",
      title: "Spend To Date",
      icon: "pi pi-shop",
      value: 0,
      extraValue: 0,
      cardImg: 'total-expenses',
      idTitle: 'title-two',
      idValue: 'amount-two',
      useCurrency: true
    },
    {
      id: "available",
      title: "Available for spending",
      icon: "pi pi-wallet",
      value: 0,
      cardImg: 'budgets',
      idTitle: 'title-three',
      idValue: 'amount-three',
      useCurrency: false
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      if (this.budgetSummary) {
        this.updateCardValues();
        this.animateCards()
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["budgetSummary"] && changes["budgetSummary"].currentValue) {
      this.updateCardValues();
      this.animateCards()
    }
  }

  private updateCardValues(): void {
    if (this.budgetSummary) {
      const available = (this.budgetSummary.budgeted - this.budgetSummary.spent)
      this.cardsInfo[0].value = this.budgetSummary.budgeted
      this.cardsInfo[1].value = this.budgetSummary.spent
      this.cardsInfo[1].extraValue = this.budgetSummary.percentage
      this.cardsInfo[2].value = (available) < 0 ? 0 : available
    }
  }

  private animateCards(): void {
    if (!this.valueElements || this.valueElements.length === 0) {
      console.warn('Los elementos del DOM aún no están disponibles.');
      return;
    }

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
