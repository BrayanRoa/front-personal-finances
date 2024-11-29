import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BanksInformation } from '../../../../shared/interfaces/wallet/wallet.interface';
import { DropdownOption } from '../../../../shared/components/bottons/drop-down/drop-down.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit {

  @Input() wallets: BanksInformation[] = []
  walletSelected: string = ""

  @Input() years: DropdownOption[] = []
  yearSelect: number = new Date().getFullYear()

  @Output() wallet = new EventEmitter<(number)>
  @Output() year = new EventEmitter<(number)>

  constructor() { }

  ngOnInit(): void {
    // Inicializar el walletSelected con el primer elemento del arreglo de wallets
    this.walletSelected = this.wallets[0].name
    this.wallet.emit(this.wallets[0].id)

  }

  onBankChange(options: DropdownOption) {
    console.log("OJO", options);
    this.walletSelected = options.name
    this.wallet.emit(+options.id)
  }

  onYearChange(options: DropdownOption) {
    console.log(options);
    this.yearSelect = +options.id
    this.year.emit(+options.id)
  }
}
