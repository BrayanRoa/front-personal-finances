import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { TABLE_COLUMNS_WALLET } from '../../statics/wallets.config';
import { WalletData } from '../../interfaces/wallet.interface';
import { actionsButton } from '../../../../shared/interfaces/use-common.interfce';
import { FORM_CONFIG_WALLET } from '../../../../layout/statics/layout.config';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from '../../../../shared/interfaces/generic-components/form.interface';

@Component({
  selector: 'app-table-wallets',
  templateUrl: './table-wallets.component.html',
  styleUrl: './table-wallets.component.css'
})
export class TableWalletsComponent {

  // MODAL
  visible: boolean = false;
  formConfig: FormFieldConfig[] | null = FORM_CONFIG_WALLET
  nameButton = 'update'
  walletSelected = signal<WalletData | null>(null)
  @Output()
  resetForm = new EventEmitter<void>();

  @Output()
  walletToUpdate = new EventEmitter<{ id: number, data: WalletData }>()
  idWalletSelected: number = 0

  @Output()
  idWalletSelectedToDelete = new EventEmitter<(number)>()

  columns = TABLE_COLUMNS_WALLET

  @Input()
  data: WalletData[] = []

  actions: actionsButton<WalletData>[] = [
    {
      label: '',
      type: 'button',
      icon: 'pi pi-pencil',
      color: 'info',
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
    this.idWalletSelected = id
    this.walletSelected.set(wallet)
    this.showModal()
  }

  deleteRow(row: number) {
    this.idWalletSelectedToDelete.emit(row)
  }

  closeModal() {
    this.visible = false;
    this.formConfig = null;
    this.walletSelected.set(null)
  }

  showModal() {
    this.visible = true;
    this.formConfig = FORM_CONFIG_WALLET
    this.nameButton = 'update'
    this.resetForm.emit()
  }

  saveOrUpdateTransaction(event: { data: FormGroup, action: string }) {
    // this.showModal()
    const walletPayload: WalletData = {
      ...event.data.value,
      type_account: event.data.value.type_account,
    }
    console.log("ESTA ES LA ACCIÓN", event.action);
    console.log("ESTA ES LA ACCIÓN", walletPayload)
    this.walletToUpdate.emit({ id: this.idWalletSelected, data: walletPayload });
    this.closeModal()
  }

}
