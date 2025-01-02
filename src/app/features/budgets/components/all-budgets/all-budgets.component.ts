import { Component, Input } from '@angular/core';
import { TABLE_COLUMNS_BUDGET } from '../../statics/budget.config';
import { BudgetData } from '../../interfaces/budget.interface';
import { BudgetService } from '../../service/budget.service';
import { Transaction } from '../../../../shared/interfaces/transactions/getAll.interface';
import { MetaData } from '../../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-all-budgets',
  templateUrl: './all-budgets.component.html',
  styleUrl: './all-budgets.component.css'
})
export class AllBudgetsComponent {

  visible: boolean = false;
  tableColumns = TABLE_COLUMNS_BUDGET
  transactions: Transaction[] = []
  metaData: MetaData = {
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    next_page: true
  };

  data: any;

  options: any;


  constructor(
    private budgetService: BudgetService
  ) { }

  @Input()
  budgetData: BudgetData[] = []

  openModal() {
    this.visible = true;
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.3,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  getTransactions(budget: BudgetData) {
    const ids = budget.BudgetCategories?.map(c => {
      return c.categoryId
    })

    this.budgetService.getTransactionsByBudget(ids!, budget.date.toString(), budget.end_date.toString()).subscribe({
      next: (response) => {
        this.transactions = response.data.transactions
        this.metaData = response.data.meta
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    })
  }
}
