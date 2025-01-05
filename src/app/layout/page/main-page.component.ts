import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../core/service/theme.service';
import { FormFieldConfig } from '../../shared/interfaces/generic-components/form.interface';
import { CoreService } from '../../core/service/core.service';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';
import { BaseComponent } from '../../shared/components/base-component/base-component.component';
import { finalize } from 'rxjs';
import { FORM_CONFIG_WALLET, THEMES } from '../statics/layout.config';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent extends BaseComponent implements OnInit {

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
  themes = THEMES

  selectedTheme: { id: string; label: string } = this.themes[0];

  // CONFIGURACIÓN DEL FORMULARIO
  formConfig!: FormFieldConfig[] | null;

  checked: boolean = false;



  configRoutes = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'pi pi-chart-bar',
      exact:true
    },
    {
      label: 'Wallets',
      path: 'wallets',
      icon: 'pi pi-wallet',
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
      exact:false
    },
    {
      label: 'Categories and tags',
      path: 'categories',
      icon: 'pi pi-tags',
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
  ngOnInit(): void {
    this.formConfig = FORM_CONFIG_WALLET;
  }

  showDialog() {
    this.formConfig = FORM_CONFIG_WALLET;
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
    this.formConfig = null
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
    this.circulo.nativeElement.classList.toggle('prendido')

    // Cambiar el tema usando el ThemeService
    this.themeService.switchTheme(this.selectedTheme.id);
  }

  onSaveNewWallet(event: { data: FormGroup, action: string }) {

    const formData: BanksInformation = event.data.value;
    formData.initial_balance = Number(formData.initial_balance)

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

  // closemodal() {
  //   this.visible = false;
  // }

}
