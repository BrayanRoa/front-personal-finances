import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

export interface ChartInterface {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  borderWidth?: number
  tension?: number
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnChanges {

  chart: any
  @Input() labels: string[] = [];
  @Input() datasets: ChartInterface = {
    label: '',
    data: [],
    borderColor: '',
    backgroundColor: '',
    borderWidth: 1,
    tension: 0,
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["datasets"] && changes["datasets"].currentValue) {
      if (this.chart) {
        this.chart.destroy(); // Destruir gráfico previo
      }
      const ctx = document.getElementById('mychart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, this.updateChartData());
    }
  }

  updateChartData() {
    const rootStyles = getComputedStyle(document.documentElement);
    const labelColor = rootStyles.getPropertyValue('--color-texto');
    const gridColor = rootStyles.getPropertyValue('--primary-color');

    console.log(labelColor);
    console.log(gridColor);
    const data = {
      labels: this.labels,
      datasets: [
        {
          label: this.datasets.label,
          data: this.datasets.data,
          borderColor: this.datasets.borderColor,
          backgroundColor: this.datasets.backgroundColor,
          borderWidth: this.datasets.borderWidth,
          tension: this.datasets.tension,
        },
      ],
    };

    const config: any = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: labelColor,
              position: 'top',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: labelColor,
            },
            grid: {
              color: gridColor,
            },
          },
          y: {
            ticks: {
              color: labelColor,
            },
            grid: {
              color: gridColor,
            },
          },
        },
      },
    };

    return config;
  }





}
