import { Component, Input, SimpleChanges } from '@angular/core';
import { budgetData } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrl: './horizontal-bar.component.css'
})
export class HorizontalBarComponent {

  data: any;
  @Input() datasets: budgetData[] = [];
  @Input() labels: string[] = [];
  options: any;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasets'] && changes['datasets'].currentValue) {
      console.log("POR AQUI ESTOY");
      this.updateChartData();
    }
  }

  updateChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.themeService.colorTextStyle();
    const textColorSecondary = this.themeService.colorLegendStyle()
    const surfaceBorder = this.themeService.colorBorderStyle();

    this.data = {
      labels: this.datasets.map(dataset => dataset.name),
      datasets: [
        {
          label: 'Budget Progress',
          backgroundColor: this.datasets.map(dataset => {
            if (dataset.percentage <= 70) return documentStyle.getPropertyValue('--green-600');
            else if (dataset.percentage <= 100) return documentStyle.getPropertyValue('--yellow-500');
            else return 'red';
          }),
          borderColor: surfaceBorder,
          data: this.datasets.map(dataset => dataset.percentage)
        },
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const dataset = this.datasets[context.dataIndex];
              return `Spent: $${dataset.current_amount} / $${dataset.limit_amount}`;
            }
          }
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          max: 150,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
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
}
