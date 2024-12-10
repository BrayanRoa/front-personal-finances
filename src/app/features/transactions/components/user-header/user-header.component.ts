import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BanksInformation } from '../../../../shared/interfaces/wallet/wallet.interface';
import { DropdownOption } from '../../../../shared/components/bottons/drop-down/drop-down.component';
import { BalanceInformation } from '../../page/transactions.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit {

  @Input() balanceInformation: BalanceInformation = {
    totalIncomes: 0,
    totalExpenses: 0
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
