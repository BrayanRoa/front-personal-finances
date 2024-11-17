import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { graphPolarity } from '../../interfaces/dashboard/summary-wallets.interface';

@Component({
    selector: 'app-polar-bar-chart',
    templateUrl: './polar-bar-chart.component.html',
    styleUrl: './polar-bar-chart.component.css'
})
export class PolarBarChartComponent implements OnChanges {
    data: any;
    @Input() dataPolar!: graphPolarity[]


    options: any;
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["dataPolar"] && changes["dataPolar"].currentValue) {
            this.updateChartData();
        }
    }


    updateChartData() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--color-text-card-three'); // color de los nombre de las categoras
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const a = this.dataPolar.map(f => {
            return f.name
        })
        console.log(a);

        this.data = {
            datasets: [
                {
                    data: this.dataPolar.map(f => { return f.transactionCount }),
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ],
                    label: 'My dataset'
                }
            ],
            labels: this.dataPolar.map(label => { return label.name })
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
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
