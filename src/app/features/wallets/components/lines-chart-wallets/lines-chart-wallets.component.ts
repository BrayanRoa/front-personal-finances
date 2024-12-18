import { Component, effect, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MONTHS } from '../../../../shared/constants/constants';
import { ThemeService } from '../../../../core/service/theme.service';
import { IMonthlyBalanceByWallet } from '../../interfaces/wallet.interface';

@Component({
  selector: 'app-lines-chart-wallets',
  templateUrl: './lines-chart-wallets.component.html',
  styleUrl: './lines-chart-wallets.component.css'
})
export class LinesChartWalletsComponent {

  data: any;

  options: any;

  @Input()
  datasets!: IMonthlyBalanceByWallet | null

  constructor(
    private themeService: ThemeService
  ) {
    effect(() => {
      if (this.themeService.change()) {
        this.updateChart()
      }
    })
  }
  // ngOnInit(): void {
  //   this.updateChart()
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datasets'] && changes['datasets'].currentValue) {
      this.updateChart();
      console.log('Datasets updated:', changes['datasets'].currentValue);
    }
  }


  updateChart() {
    if (!this.datasets) {
      console.warn('No datasets available to update chart');
      return;
    }

    // const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.themeService.colorTextStyle();
    const textColorSecondary = this.themeService.colorLegendStyle();
    const surfaceBorder = this.themeService.colorBorderStyle();

    const datasets = Object.entries(this.datasets).map(([bankName, info]) => {
      return {
        label: bankName,
        data: info
          .sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime())
          .map((t: any) => t.balance), // los meses de cada banco no llegan ordenados, por eso aqui se ordenan
        // fill: false,
        // borderColor: this.themeService.colorPinkBar(),
        tension: 0.1
      }
    })

    this.data = {
      labels: MONTHS.map((month) => month.shortcut),
      datasets,
    };

    this.options = {
      aspectRatio: 0.9,
      stacked: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };
  }

}
