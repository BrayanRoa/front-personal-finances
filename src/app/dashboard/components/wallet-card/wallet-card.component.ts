import { Component, Input } from '@angular/core';
import { Transaction, TransactionResponse } from '../../interfaces/transactions/getAll.interface';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent {

  @Input() transactions: Transaction[] = [];

  
  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }

}
