import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BanksInformation } from '../../../../shared/interfaces/wallet/wallet.interface';

@Component({
  selector: 'app-banks-information',
  templateUrl: './banks-information.component.html',
  styleUrl: './banks-information.component.css'
})
export class BanksInformationComponent implements OnChanges {

  @Input() bankData!: BanksInformation[]

  data: any;

  options: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["bankData"] && changes["bankData"].currentValue) {
      this.updateChar();
    }
  }

  updateChar() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: this.bankData.map(bankData => { return bankData.name }),
      datasets: [
        {
          data: this.bankData.map(bankData => { return bankData.balance }),
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
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
