import { Component, effect, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TABLE_COLUMNS_BUDGET } from '../../statics/budget.config';
import { BudgetData } from '../../interfaces/budget.interface';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-cake-card',
  templateUrl: './cake-card.component.html',
  styleUrl: './cake-card.component.css'
})
export class CakeCardComponent implements OnInit {

  data: any;
  options: any;

  @Input()
  percentage: number = 0;

  constructor(
    private themeService: ThemeService
  ) {

    effect(() => {
      if (this.themeService.change()) {
        this.updateChart()
      }
    })
  }


  OnChanges(changes: SimpleChanges) {
    if (changes["percentage"] && changes["percentage"].currentValue) {
      this.updateChart()
    }
  }

  ngOnInit(): void {
    this.updateChart()
  }

  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    // const textColor = documentStyle.getPropertyValue('--text-color');

    const textColor = this.themeService.colorTextStyle()

    this.data = {
      labels: ['Available', 'Expensed'],
      datasets: [
        {
          data: [100 - this.percentage, this.percentage],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

}
