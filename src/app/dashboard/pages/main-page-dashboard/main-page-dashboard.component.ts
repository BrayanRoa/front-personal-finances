import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-main-page-dashboard',
  templateUrl: './main-page-dashboard.component.html',
  styleUrl: './main-page-dashboard.component.css'
})
export class MainPageDashboardComponent {

  @ViewChild('icon') myElement!: ElementRef;
  @ViewChild('mini_barra_lateral') barraLateral!: ElementRef;
  @ViewChild('switch') palanca!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('circulo') circulo!: ElementRef;
  // Uso de QueryList para obtener una lista de elementos
  @ViewChildren('mySpan') mySpans!: QueryList<ElementRef>;

  ngAfterViewInit() {
    console.log(this.myElement);  // Ahora puedes acceder al elemento a través de this.myElement
  }

  handleClick() {
    // se agrega esta clase al hacer click
    this.barraLateral.nativeElement.classList.toggle('mini-barra-lateral')
    
    this.mySpans.forEach((span) => {
      span.nativeElement.classList.toggle('oculto')
    });
    // this.mySpan.nativeElement.classList.toggle('oculto')
  }

  onDarkMode(){
    // let body = document.querySelector('body')

    this.container.nativeElement.classList.toggle('dark-mode')
    this.circulo.nativeElement.classList.toggle('prendido')
    // this.mySpan.nativeElement.classList.toggle('dark-mode')
  }
}
