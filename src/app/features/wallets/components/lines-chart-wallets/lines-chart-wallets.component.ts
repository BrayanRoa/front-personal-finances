import { Component, effect, OnInit } from '@angular/core';
import { MONTHS } from '../../../../shared/constants/constants';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-lines-chart-wallets',
  templateUrl: './lines-chart-wallets.component.html',
  styleUrl: './lines-chart-wallets.component.css'
})
export class LinesChartWalletsComponent implements OnInit {

  data: any;

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
  ngOnInit(): void {
    this.updateChart()
  }


  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.themeService.colorTextStyle()
    const textColorSecondary = this.themeService.colorLegendStyle()
    const surfaceBorder = this.themeService.colorBorderStyle()

    this.data = {
      labels: MONTHS.map(month => month.shortcut),
      // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Dataset 1',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          tension: 0.1,
          data: [65, 59, 80, 81, 56, 55, 10]
        },
        {
          label: 'Dataset 2',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          yAxisID: 'y1',
          tension: 0.1,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.9,
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
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder
          }
        }
      }
    };
  }

}
