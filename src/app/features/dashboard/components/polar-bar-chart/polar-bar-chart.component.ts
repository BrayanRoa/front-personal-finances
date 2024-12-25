import { Component, effect, Input, OnChanges, SimpleChanges } from '@angular/core';
import { graphPolarityData } from '../../../../shared/interfaces/dashboard/summary-wallets.interface';
import { ThemeService } from '../../../../core/service/theme.service';

@Component({
    selector: 'app-polar-bar-chart',
    templateUrl: './polar-bar-chart.component.html',
    styleUrl: './polar-bar-chart.component.css'
})
export class PolarBarChartComponent implements OnChanges {
    data: any;
    @Input() dataPolar!: graphPolarityData[]

    constructor(
        private themeService: ThemeService
    ) {
        effect(() => {
            if (this.themeService.change()) {
                this.updateChartData()
            }
        })
    }


    options: any;
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["dataPolar"] && changes["dataPolar"].currentValue) {
            this.updateChartData();
        }
    }

    updateChartData() {

        const textColor = this.themeService.colorTextStyle()
        const surfaceBorder = this.themeService.colorBorderStyle()

        this.data = {
            datasets: [
                {
                    data: this.dataPolar
                        .filter(f => f.transactioncount > 0) // Condición: Solo incluir transacciones con transactionCount > 0
                        .map(f => f.transactioncount),      // Mapeo: Extraer transactionCount
                    backgroundColor: this.dataPolar.map(f => f.color),
                    label: 'Number of transactions'
                }
            ],
            labels: this.dataPolar
                .filter(f => f.transactioncount > 0) // Condición: Solo incluir transacciones con transactionCount > 0
                .map(f => f.name),      // Mapeo: Extraer transactionCount
        };

        this.options = {
            aspectRatio: 0.7,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

}
