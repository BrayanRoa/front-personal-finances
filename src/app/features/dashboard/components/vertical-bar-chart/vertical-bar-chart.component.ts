import { Component, effect, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { graphVerticalData } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { DropdownOption } from '../../../../shared/components/bottons/drop-down/drop-down.component';
import { MONTHS } from '../../../../shared/constants/constants';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrl: './vertical-bar-chart.component.css'
})
export class VerticalBarChartComponent implements OnChanges {

  @Input() dataYears: DropdownOption[] = []
  yearSelected: number = new Date().getFullYear();
  @Output() onYearSelected = new EventEmitter<number>();

  data: any;
  options: any;
  @Input() dataGraph!: graphVerticalData[]

  constructor(
    private themeService: ThemeService
  ) {
    effect(() => {
      if (this.themeService.change()) {
        this.updateChartData()
      }
    })
  }

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


    const textColor = this.themeService.colorTextStyle();
    const blueBar = this.themeService.colorBlueBar()
    const pinkBar = this.themeService.colorPinkBar()

    this.data = {
      labels: MONTHS.map(month => { return month.shortcut }),
      datasets: [
        {
          label: 'Income',
          backgroundColor: blueBar,
          borderColor: blueBar,
          data: incomes,
        },
        {
          label: 'Outflow',
          backgroundColor: pinkBar,
          borderColor: pinkBar,
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
            color: this.themeService.colorTextStyle()
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              weight: 400
            }
          },
          grid: {
            color: this.themeService.colorBorderStyle(),
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColor
          },
          grid: {
            color: this.themeService.colorBorderStyle(),
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
