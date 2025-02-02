import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnInit, OnChanges {

  @ViewChildren('valueElement') valueElements!: QueryList<any>;

  isLoading: boolean = true;

  @Input()
  walletSummary!: any | null; // Asegurar que pueda ser null inicialmente

  cardsInfo: any[] = [
    {
      id: "totalIncome",
      title: "Total Incomes",
      icon: "pi pi-money-bill",
      value: 0,
      cardImg: 'total-incomes',
      idTitle: 'title-one',
      idValue: 'amount-one',
      useCurrency: true
    },
    {
      id: "totalExpenses",
      title: "Total Expenses",
      icon: "pi pi-shop",
      value: 0,
      cardImg: 'total-expenses',
      idTitle: 'title-two',
      idValue: 'amount-two',
      useCurrency: true
    },
    {
      id: "budgetsActives",
      title: "Budgets Actives",
      icon: "pi pi-wallet",
      value: 0,
      cardImg: 'budgets',
      idTitle: 'title-three',
      idValue: 'amount-three',
      useCurrency: false
    },];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      if (this.walletSummary) {
        this.updateCardValues();
        this.animateCards()
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["walletSummary"] && changes["walletSummary"].currentValue) {
      this.updateCardValues();
      this.animateCards()
    }
  }

  // ngAfterViewInit(): void {
  //   this.animateCards(); // Ahora sí los elementos ya existen
  // }

  private updateCardValues(): void {
    if (this.walletSummary) {
      this.cardsInfo.forEach(card => {
        card.value = this.walletSummary![card.id] ?? 0;
      });
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
