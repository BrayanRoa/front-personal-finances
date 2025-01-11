import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BanksInformation } from '../../../../shared/interfaces/wallet/wallet.interface';
import { DropdownOption } from '../../../../shared/components/bottons/drop-down/drop-down.component';
import { BalanceInformation } from '../../page/transactions.component';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnChanges {

  @ViewChild('incomes', { static: true }) incomes!: ElementRef;
  @ViewChild('expenses', { static: true }) expenses!: ElementRef;
  @ViewChild('balance', { static: true }) balance!: ElementRef;

  @Output()
  clearFilters = new EventEmitter<(void)>;

  @Input() balanceInformation!: BalanceInformation

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['balanceInformation'] && changes['balanceInformation'].currentValue) {
      this.loadNumbers();
    }
  }

  loadNumbers(): void {
    const totalBalance = this.balanceInformation.totalIncomes - this.balanceInformation.totalExpenses;

    // Configuración común para CountUp
    const countUpConfig = {
      duration: 2, // Duración en segundos
      separator: ',', // Separador de miles
      prefix: '$', // Prefijo
    };

    // Inicializar animaciones
    this.animateNumber(this.incomes.nativeElement, this.balanceInformation.totalIncomes!, countUpConfig);
    this.animateNumber(this.expenses.nativeElement, this.balanceInformation.totalExpenses!, countUpConfig);
    this.animateNumber(this.balance.nativeElement, totalBalance, countUpConfig);
  }

  private animateNumber(element: HTMLElement, value: number, config: any): void {
    const countUp = new CountUp(element, value, config);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(`Error animando el elemento ${element}:`, countUp.error);
    }
  }


  onClearFilters() {
    this.clearFilters.emit();
  }


}
