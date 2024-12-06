import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../core/service/theme.service';
import { FormFieldConfig } from '../../shared/interfaces/generic-components/form.interface';
import { CoreService } from '../../core/service/core.service';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';
import { BaseComponent } from '../../shared/components/base-component/base-component.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent extends BaseComponent {

  isSmallMenu: boolean = false;

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

  configRoutes = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'pi pi-chart-bar',
    },
    {
      label: 'Transactions',
      path: 'transactions',
      icon: 'pi pi-money-bill',
    },
    {
      label: 'Budgets',
      path: 'budgets',
      icon: 'pi pi-wallet',
    },
    {
      label: 'Settings',
      path: 'settings',
      icon: 'pi pi-cog',
    }
  ]

  constructor(
    private themeService: ThemeService,
    private coreService: CoreService,

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
    this.isSmallMenu = !this.isSmallMenu
  }

  onDarkMode() {
    // Alternar entre los temas disponibles
    this.selectedTheme =
      this.selectedTheme.id === this.themes[0].id
        ? this.themes[1]
        : this.themes[0];

    // Cambiar el tema usando el ThemeService
    this.themeService.switchTheme(this.selectedTheme.id);
  }

  onSaveNewWallet(event: { data: FormGroup, action: string }) {

    const formData: BanksInformation = event.data.value;

    this.coreService.createBank(formData).pipe(
      finalize(() => {
        this.visible = false
      })
    ).subscribe({
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
