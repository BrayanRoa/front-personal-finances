import { Component, OnInit, signal } from '@angular/core';
import { FormFieldConfig, SummaryInterface } from '../../../shared/interfaces/generic-components/form.interface';
import { BudgetService } from '../service/budget.service';
import { BudgetData } from '../interfaces/budget.interface';
import { ITransactionByBudget } from '../interfaces/transaction-by-budget.interface';
import { FORM_CONFIG_BUDGET } from '../statics/budget.config';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { CoreService } from '../../../core/service/core.service';
import { WalletService } from '../../wallets/service/wallet.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent implements OnInit {

  budgetData: BudgetData[] = []
  transactions: ITransactionByBudget[] = []

  visible: boolean = false
  formConfig!: FormFieldConfig[] | null

  walletsData = signal<BanksInformation[]>([]);
  categoryData = signal<CategoryInterface[]>([]);


  budgetCard: SummaryInterface[] = [
    {
      // id: "totalIncome",
      title: "Total Budgets",
      icon: "pi pi-money-bill",
      value: 0,
      cardImg: 'total-incomes',
      idTitle: 'title-one',
      idValue: 'amount-one',
      useCurrency: true
    },
    {
      // id: "totalExpenses",
      title: "Spend To Date",
      icon: "pi pi-shop",
      value: 0,
      cardImg: 'total-expenses',
      idTitle: 'title-two',
      idValue: 'amount-two',
      useCurrency: true
    },
    {
      // id: "budgetsActives",
      title: "Available for spending",
      icon: "pi pi-wallet",
      value: 0,
      cardImg: 'budgets',
      idTitle: 'title-three',
      idValue: 'amount-three',
      useCurrency: false
    },
  ]

  constructor(
    private budgetService: BudgetService,
    private coreService: CoreService,
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.getBudgets()
    this.loadCategories()
    this.loadWallets()
    this.formConfig = FORM_CONFIG_BUDGET
  }

  openModal() {
    this.loadOptions()
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
    this.formConfig = null
  }

  getBudgets() {
    this.budgetService.getAll().subscribe({
      next: (response) => {
        this.budgetData = response.data;
        console.log(this.budgetData);
      },
      error: (error) => {
        console.error('Error fetching budgets:', error);
      }
    })
  }

  private loadOptions() {
    this.formConfig = FORM_CONFIG_BUDGET
    return new Promise<void>((resolve, reject) => {
      this.formConfig!.forEach(data => {
        if (data.name === 'walletId') {
          data.options = [
            ...this.walletsData().map(wallet => ({
              label: wallet.name,
              value: wallet.id,
            })),
          ];
        }
        if (data.name === 'categoryId') {
          data.options = [
            ...this.categoryData().map(category => ({
              label: category.name,
              value: category.id,
            })),
          ];
        }
      });
      resolve();
    });
  }

  private loadCategories(): void {
    this.coreService.getCategories().subscribe({
      next: (response) => {
        this.categoryData.set(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  private loadWallets() {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        this.walletsData.set(response.data);
      },
      error: (error: any) => {
        console.error('Error fetching wallets:', error);
      },
    });
  }


}
