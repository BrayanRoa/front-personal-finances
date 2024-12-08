import { Component, Input, SimpleChanges } from '@angular/core';
import { MONTHS } from '../../../../shared/constants/constants';

@Component({
  selector: 'app-balance-line-chart',
  templateUrl: './balance-line-chart.component.html',
  styleUrl: './balance-line-chart.component.css'
})
export class BalanceLineChartComponent {
  data: any;
  @Input() datasets: any[] = []

  options: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["datasets"] && changes["datasets"].currentValue) {
      this.updateChart()
    }
  }

  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: MONTHS.map(month => { return month.shortcut }),
      datasets: [
        {
          label: "Monthly Balance",
          data: this.datasets.map(dataset => {
            return dataset.total
          }),
          tension: 0.1,
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
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
}
