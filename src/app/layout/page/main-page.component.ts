import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../core/service/theme.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormFieldConfig } from '../../shared/interfaces/generic-components/form.interface';
import { WalletService } from '../../core/service/wallet.service';
import { BanksInformation } from '../../shared/interfaces/wallet/wallet.interface';
import { BaseComponent } from '../../shared/components/base-component/base-component.component';
import { CommonResponse } from '../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent extends BaseComponent {

  visible: boolean = false;
  @ViewChild('icon') myElement!: ElementRef;
  @ViewChild('mini_barra_lateral') barraLateral!: ElementRef;
  @ViewChild('switch') palanca!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('circulo') circulo!: ElementRef;
  // Uso de QueryList para obtener una lista de elementos
  @ViewChildren('mySpan') mySpans!: QueryList<ElementRef>;

  // public myForm: FormGroup = this.fb.group({
  //   name: ['', [Validators.required]],
  //   description: ['', [Validators.required]],
  //   balance: [0, [Validators.required]],
  // })

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
    // private fb: FormBuilder,
    private themeService: ThemeService,
    private router: Router,
    private walletService: WalletService
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

    this.walletService.createBank(formData).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data)
        this.visible = false;
      },
      error: (response) => {
        this.handleResponse(response.error.status, response.error.data)
      }
    })
  }

  numberValue: string = '';

  formatNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/,/g, ''); // Remueve las comas existentes
    if (!isNaN(Number(value))) {
      input.value = Number(value).toLocaleString('en-US'); // Agrega separadores de miles
    }
  }

  removeFormatting(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/,/g, ''); // Limpia el valor para un envío limpio
  }



  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-envelope',
        badge: '5',
        command: () => {
          this.router.navigate(['/main/dashboard']);
        },
        routerLinkActiveOptions: true
      },
      {
        label: 'Transactions',
        icon: 'pi pi-chart-bar',
        command: () => {
          this.router.navigate(['/main/transactions']);
        },
        routerLinkActiveOptions: true

        // items: [
        //   {
        //     label: 'Sales',
        //     icon: 'pi pi-chart-line',
        //     badge: '3'
        //   },
        //   {
        //     label: 'Products',
        //     icon: 'pi pi-list',
        //     badge: '6'
        //   }
        // ]
      },
      {
        label: 'Budgets',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O'
          },
          {
            label: 'Privacy',
            icon: 'pi pi-shield',
            shortcut: '⌘+P'
          }
        ]
      }
    ];
  }

  isActive(routerLink: string): boolean {
    // Compara la URL actual con el routerLink del elemento
    return this.router.url === routerLink;
  }

  toggleAll() {
    const expanded = !this.areAllItemsExpanded();
    this.items = this.toggleAllRecursive(this.items, expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
    return items.map((menuItem) => {
      menuItem.expanded = expanded;
      if (menuItem.items) {
        menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
      }
      return menuItem;
    });
  }

  private areAllItemsExpanded(): boolean {
    return this.items.every((menuItem) => menuItem.expanded);
  }

}
