import { Component, effect, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-cake-card',
  templateUrl: './cake-card.component.html',
  styleUrl: './cake-card.component.css'
})
export class CakeCardComponent implements OnChanges {

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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["percentage"] && changes["percentage"].currentValue !== undefined) {
      this.updateChart();
    }
  }

  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);

    const textColor = this.themeService.colorTextStyle()

    const value = (100 - this.percentage < 0) ? 0 : 100 - this.percentage

    this.data = {
      labels: ['Available', 'Expensed'],
      datasets: [
        {
          data: [value, this.percentage],
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
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw; // Obtiene el valor actual
              const label = context.label; // Obtiene la etiqueta ("Available" o "Expensed")
              return `${label}: ${value}%`; // Devuelve el texto con el porcentaje
            },
          },
        },
      },
    };
  }

}
