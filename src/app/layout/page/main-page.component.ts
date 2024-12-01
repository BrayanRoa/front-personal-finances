import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  visible: boolean = false;
  @ViewChild('icon') myElement!: ElementRef;
  @ViewChild('mini_barra_lateral') barraLateral!: ElementRef;
  @ViewChild('switch') palanca!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('circulo') circulo!: ElementRef;
  // Uso de QueryList para obtener una lista de elementos
  @ViewChildren('mySpan') mySpans!: QueryList<ElementRef>;


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    balance: [0, [Validators.required]],
  })

  themes = [
    {
      id: 'saga-blue',
      label: 'saga-blue'
    },
    {
      id: 'vela-blue',
      label: 'vela-blue'
    },
  ];

  selectedTheme: { id: string; label: string } = this.themes[0];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
  ) { }

  showDialog() {
    this.visible = true;
  }

  handleClick() {
    // se agrega esta clase al hacer click
    this.barraLateral.nativeElement.classList.toggle('mini-barra-lateral')
    this.mySpans.forEach((span) => {
      span.nativeElement.classList.toggle('oculto')
    });
  }

  onDarkMode() {
    // Alterna entre los temas
    if (this.selectedTheme.id === this.themes[0].id) {
      this.selectedTheme = this.themes[1];
    } else {
      this.selectedTheme = this.themes[0];
    }

    // Cambia el tema usando el servicio
    this.appService.switchTheme(this.selectedTheme.id);

    // Opcional: Cambia clases adicionales si es necesario
    this.container.nativeElement.classList.toggle('dark-mode');
    this.circulo.nativeElement.classList.toggle('prendido');
  }


  onSaveNewWallet() {
    console.log(this.myForm.value);
    // this.walletService.addWallet(this.myForm.value).subscribe({
    //   next: (data) => {
    //     Swal.fire({
    //       title: data.data,
    //       icon: "success"
    //     });
    //   },
    //   error: (error) => {
    //     Swal.fire({
    //       title: error.error.data,
    //       icon: "error"
    //     });
    //   }
    // })
  }

}
