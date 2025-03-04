import { Component, effect, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BanksInformation } from '../../../../shared/interfaces/wallet/wallet.interface';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-banks-information',
  templateUrl: './banks-information.component.html',
  styleUrl: './banks-information.component.css'
})
export class BanksInformationComponent implements OnChanges {

  @Input() bankData!: BanksInformation[]

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["bankData"] && changes["bankData"].currentValue) {
      this.updateChart();
    }
  }

  updateChart() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.themeService.colorTextStyle()

    this.data = {
      labels: this.bankData.map(bankData => { return bankData.name }),
      datasets: [
        {
          data: this.bankData.map(bankData => { return ((bankData.initial_balance + bankData.incomes) - bankData.expenses) }),
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--pink-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--cyan-400'),
            documentStyle.getPropertyValue('--pink-400')
          ]
        }
      ]
    };


    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

}
