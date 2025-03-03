import { Component, effect, Input, SimpleChanges } from '@angular/core';
import { WalletData } from '../../interfaces/wallet.interface';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-vertical-chart-wallets',
  templateUrl: './vertical-chart-wallets.component.html',
  styleUrl: './vertical-chart-wallets.component.css'
})
export class VerticalChartWalletsComponent {

  data: any;

  @Input()
  datasets: WalletData[] = []

  options: any;

  constructor(
    private themeService: ThemeService
  ) {
    effect(() => {
      if (this.themeService.change()) {
        this.updateChart()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["datasets"] && changes["datasets"].currentValue) {
      this.updateChart()
    }
  }

  updateChart() {
    const textColor = this.themeService.colorTextStyle()
    const textColorSecondary = this.themeService.colorLegendStyle()
    const borderColor = this.themeService.colorBorderStyle()
    const blueBar = this.themeService.colorBlueBar()
    const pinkBar = this.themeService.colorPinkBar()
    const greenBar = this.themeService.colorGreenBar()

    this.data = {
      labels: this.datasets.map(data => data.name),
      datasets: [
        {
          label: 'Initial amount',
          backgroundColor: greenBar,
          borderColor: greenBar,
          data: this.datasets.map(dataset => dataset.initial_balance)
        },
        {
          label: 'Incomes',
          backgroundColor: blueBar,
          borderColor: blueBar,
          data: this.datasets.map(dataset => dataset.incomes)
        },
        {
          label: 'Expenses',
          backgroundColor: pinkBar,
          borderColor: pinkBar,
          data: this.datasets.map(dataset => dataset.expenses)
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
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
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: borderColor,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: borderColor,
            drawBorder: false
          }
        }

      }
    };
  }

}
