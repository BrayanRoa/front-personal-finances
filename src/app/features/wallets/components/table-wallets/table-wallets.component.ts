import { Component, Input, OnInit } from '@angular/core';
import { TABLE_COLUMNS_WALLET } from '../../statics/wallets.config';
import { WalletData } from '../../interfaces/wallet.interface';
import { actionsButton } from '../../../../shared/interfaces/use-common.interfce';

@Component({
  selector: 'app-table-wallets',
  templateUrl: './table-wallets.component.html',
  styleUrl: './table-wallets.component.css'
})
export class TableWalletsComponent {

  columns = TABLE_COLUMNS_WALLET

  @Input()
  data: WalletData[] = []

  actions: actionsButton<WalletData>[] = [
    {
      label: '',
      type: 'button',
      icon: 'pi pi-pencil',
      color: 'primary',
      callback: (id: number, wallet: WalletData) => this.sendEditRow(id, wallet),
    },
    {
      label: '',
      type: 'button',
      icon: 'pi pi-trash',
      color: 'danger',
      callback: (row: number) => this.deleteRow(row),
    },
  ];

  sendEditRow(id: number, wallet: WalletData) {
    console.log("EDITAR", id, wallet);
  }

  deleteRow(row: number) {
    console.log("ELIMINAR", row);
  }



}
