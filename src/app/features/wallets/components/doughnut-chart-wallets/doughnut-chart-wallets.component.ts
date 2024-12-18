import { Component, effect, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WalletPercentages } from '../../interfaces/wallet.interface';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-doughnut-chart-wallets',
  templateUrl: './doughnut-chart-wallets.component.html',
  styleUrl: './doughnut-chart-wallets.component.css'
})
export class DoughnutChartWalletsComponent {

  data: any;

  @Input()
  percentages: WalletPercentages[] = []

  options: any;

  constructor(
    private themeService: ThemeService
  ) { 
    effect(()=>{
      if(this.themeService.change()){
        this.updateChart();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["percentages"] && changes["percentages"].currentValue) {
      this.updateChart()
    }
  }

  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.themeService.colorTextStyle();


    this.data = {
      labels: this.percentages.map(bank => bank.name),
      datasets: [
        {
          data: this.percentages.map(bank => bank.percentage),
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.options = {
      aspectRatio: 0.9,
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const dataset = this.percentages[context.dataIndex];
              return `${dataset.percentage}%`;
            }
          }
        },
      }
    };
  }

}
