import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../core/service/theme.service';
import { FormFieldConfig } from '../../shared/interfaces/generic-components/form.interface';
import { CoreService } from '../../core/service/core.service';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';
import { BaseComponent } from '../../shared/components/base-component/base-component.component';
import { finalize } from 'rxjs';
import { THEMES } from '../statics/layout.config';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

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
  // formConfig!: FormFieldConfig[] | null;

  checked: boolean = false;



  configRoutes = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'pi pi-chart-bar',
      exact: true
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
      exact: false
    },
    {
      label: 'Categories',
      path: 'categories',
      icon: 'pi pi-tags',
    },
    // {
    //   label: 'Calendar',
    //   path: 'calendar',
    //   icon: 'pi pi-calendar',
    //   exact: false
    // },
    // {
    //   label: 'Settings',
    //   path: 'settings',
    //   icon: 'pi pi-cog',
    // }
  ]

  items: MenuItem[] | undefined;


  constructor(
    private themeService: ThemeService,
    private coreService: CoreService,
    private authService: AuthService,
    private router: Router
  ) {
    super()
  }
  ngOnInit(): void {
    // this.formConfig = FORM_CONFIG_WALLET;
    this.items = [
      {
        label: 'Log out',
        icon: 'pi pi-power-off',
        command: () => this.logout()
      }
    ];
  }

  showDialog() {
    // this.formConfig = FORM_CONFIG_WALLET;
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  handleClick() {
    // se agrega esta clase al hacer click
    this.barraLateral.nativeElement.classList.toggle('mini-barra-lateral')
    this.mySpans.forEach((span) => {
      span.nativeElement.classList.toggle('oculto')
      span.nativeElement.classList.toggle('nombre-email')
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


  logout() {
    this.confirmLogout().then((logout) => {
      if (logout) {
        this.authService.logout()
        this.router.navigate(['/auth/login'])
      }
    })
  }

}
