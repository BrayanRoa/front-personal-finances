import { Component, OnInit, signal } from '@angular/core';
import { WalletService } from '../service/wallet.service';
import { IMonthlyBalanceByWallet, WalletData, WalletIncomesAndExpenses, WalletPercentages } from '../interfaces/wallet.interface';
import { NOT_FOUND_MSG } from '../../../shared/constants/constants';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { confirmDelete } from '../../../shared/components/sweet-alert-modal/sweet-alert-modal';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FORM_CONFIG_WALLET } from '../statics/wallets.config';
import { FormGroup } from '@angular/forms';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { finalize } from 'rxjs';
import { TransactionService } from '../../transactions/services/transaction.service';
import { DropdownOption } from '../../../shared/components/bottons/drop-down/drop-down.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent extends BaseComponent implements OnInit {

  walletsData: WalletData[] = []
  percentages: WalletPercentages[] = []
  incomesAndExpensesByWallet: WalletIncomesAndExpenses[] = []
  monthlyBalanceData: IMonthlyBalanceByWallet | null = null;
  msgNotFound = NOT_FOUND_MSG

  formConfig!: FormFieldConfig[] | null;

  visible: boolean = false;

  years = signal<DropdownOption[]>([]);
  yearSelected: number = new Date().getFullYear();

  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService
  ) {
    super()
  }

  ngOnInit(): void {
    this.formConfig = FORM_CONFIG_WALLET
    this.loadYears()
    this.getWallets();
    this.getIncomesAndExpenses();
    this.monthlyBalance(new Date().getFullYear());
  }

  toggleModal(value: boolean) {
    this.visible = value;
  }

  getWallets() {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        this.walletsData = response.data;
        this.calculatePercentages()
      },
      error: (error) => console.error('Error fetching wallets', error)
    });
  }

  private calculatePercentages() {
    let total = 0
    this.walletsData.forEach((wallet) => {
      total += wallet.balance
    })
    this.percentages = this.walletsData.map(bank => {
      return {
        name: bank.name,
        percentage: Math.round((bank.balance / total) * 100)
      }
    })
  }

  monthlyBalance(year: number) {
    this.walletService.getMonthlyBalanceByWallet(year).subscribe({
      next: (response) => {
        this.yearSelected = year
        this.monthlyBalanceData = response.data;
      },
      error: (error) => console.error('Error fetching monthly balance', error)
    });
  }
  getIncomesAndExpenses() {
    this.walletService.getIncomesAndExpenses().subscribe({
      next: (response) => {
        this.incomesAndExpensesByWallet = response.data
      },
      error: (error) => console.error('Error fetching incomes and expenses', error)
    });
  }

  updateWallet(event: { id: number, data: WalletData }) {
    this.walletService.updateWallet(event.id, event.data).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data);
        this.refreshData()
      },
      error: (error) => console.error('Error updating wallet', error)
    })
  }

  deleteWallet(row: number) {
    confirmDelete().then((isConfirmed) => {
      if (isConfirmed) {
        this.walletService.deleteWallet(row).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.refreshData()
          },
          error: (error) => console.error('Error deleting wallet', error)
        })
      }
    })
  }

  onSaveNewWallet(event: { data: FormGroup, action: string }) {

    const formData: BanksInformation = event.data.value;
    formData.initial_balance = Number(formData.initial_balance)

    this.walletService.createWallet(formData).pipe(
      finalize(() => {
        this.refreshData();
        this.visible = false
      })
    ).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data)
      },
      error: (response) => {
        this.handleResponse(response.error.status, response.error.data)
      }
    })
  }

  private loadYears() {
    this.transactionService.getYears().subscribe({
      next: (response) => {
        const years = response.data.map((year) => ({ id: year, name: year.toString() }))
        this.years.set(years)
      },
      error: (error) => this.handleResponse(error, 'Error fetching years'),
    })
  }

  refreshData() {
    this.calculatePercentages();
    this.getIncomesAndExpenses();
    this.getWallets()
    this.monthlyBalance(new Date().getFullYear());
  }

}
