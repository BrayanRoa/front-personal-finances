import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../core/service/theme.service';
import { FormFieldConfig } from '../../shared/interfaces/generic-components/form.interface';
import { CoreService } from '../../core/service/core.service';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';
import { BaseComponent } from '../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent extends BaseComponent {

  @ViewChild('icon') myElement!: ElementRef;
  @ViewChild('mini_barra_lateral') barraLateral!: ElementRef;
  @ViewChild('switch') palanca!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('circulo') circulo!: ElementRef;
  // Uso de QueryList para obtener una lista de elementos
  @ViewChildren('mySpan') mySpans!: QueryList<ElementRef>;

  // VARIABLE DEL MODAL
  visible: boolean = false;

  // TEMAS DE PRIME NG DISPONIBLES
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

  // CONFIGURACIÓN DEL FORMULARIO
  formConfig: FormFieldConfig[] = [
    { type: 'text', label: 'Name', name: 'name', validations: [{ required: true }] },
    { type: 'text', label: 'Description', name: 'description', validations: [{ required: true }] },
    {
      type: 'text', label: 'Balance', name: 'balance', value: 0, validations: [{ required: true }], mask: {
        mask: 'separator.2',
        prefix: '$',
        thousandSeparator: ','
      },
    },
  ]

  constructor(
    private themeService: ThemeService,
    private coreService: CoreService
  ) {
    super()
  }

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
    if (this.selectedTheme.id === this.themes[0].id) {
      this.selectedTheme = this.themes[1];
    } else {
      this.selectedTheme = this.themes[0];
    }
    this.themeService.switchTheme(this.selectedTheme.id);
    this.container.nativeElement.classList.toggle('dark-mode')
    this.circulo.nativeElement.classList.toggle('prendido')
  }

  onSaveNewWallet(form: FormGroup) {

    const formData: BanksInformation = form.value;

    this.coreService.createBank(formData).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data)
        this.visible = false;
      },
      error: (response) => {
        this.handleResponse(response.error.status, response.error.data)
      }
    })
  }

  closemodal() {
    this.visible = false;
  }

}
