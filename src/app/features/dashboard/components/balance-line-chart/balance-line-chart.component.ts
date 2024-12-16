import { Component, effect, Input, SimpleChanges } from '@angular/core';
import { MONTHS } from '../../../../shared/constants/constants';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-balance-line-chart',
  templateUrl: './balance-line-chart.component.html',
  styleUrl: './balance-line-chart.component.css'
})
export class BalanceLineChartComponent {
  data: any;
  @Input() datasets: any[] = []

  options: any;

  constructor(
    private themeService: ThemeService
  ) { 

    effect(()=>{
      if(this.themeService.change()){
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
            color: borderColor
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: borderColor
          }
        }
      }
    };
  }
}
