import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { graphVerticalData } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { DropdownOption } from '../../../../shared/components/bottons/drop-down/drop-down.component';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrl: './vertical-bar-chart.component.css'
})
export class VerticalBarChartComponent implements OnChanges {

  // isDropdownOpen = signal<boolean>(false);
  // month: number = new Date().getFullYear()
  @Input() dataYears: DropdownOption[] = []
  yearSelected: number = new Date().getFullYear();
  @Output() onYearSelected = new EventEmitter<number>();

  data: any;
  options: any;
  @Input() dataGraph!: graphVerticalData[]

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataGraph'] && changes['dataGraph'].currentValue) {
      this.updateChartData();
    }
  }


  private updateChartData() {

    let incomes = this.dataGraph
      .filter(d => d.type === 'INCOME') // Filtra solo los que son 'INCOME'
      .map(d => d.total);              // Mapea a sus totales

    let outflows = this.dataGraph
      .filter(d => d.type === 'OUTFLOW') // Filtra solo los que son 'OUTFLOW'
      .map(d => d.total);               // Mapea a sus totales

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Income',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: incomes
        },
        {
          label: 'Outflow',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: outflows
        }
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
            color: textColorSecondary,
            font: {
              weight: 400
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

  onChangeYear(options: { id: number | string, name: string }) {
    this.yearSelected = +options.id;
    this.onYearSelected.emit(+options.id)
  }
}
