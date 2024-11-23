import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { summaryWalletsResponse } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnChanges{
  
  // @Input() transactions: Transaction[] = [];
  
  @Input() walletSummary!:summaryWalletsResponse
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["walletSummary"] && changes["walletSummary"].currentValue){
      
    }
  }
  
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
