import { Component, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../../../../core/service/core.service';
import { WalletService } from '../../../wallets/service/wallet.service';
import { FORMATTEDDATE, RECURRING_TRANSACTION_BUDGET } from '../../../../shared/constants/constants';
import { BudgetData } from '../../interfaces/budget.interface';

@Component({
  selector: 'app-form-budget',
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.css'
})
export class FormBudgetComponent {

  walletsData = signal<{ label: string, value: number }[]>([]);
  categoryData = signal<{ label: string, value: any, color: string }[]>([]);
  recurring_transactions = RECURRING_TRANSACTION_BUDGET

  @Output()
  dataBudget = new EventEmitter<({ budget: BudgetData })>

  form!: FormGroup;

  selectedCategories: string[] = [];

  @Input()
  resetForm!: boolean

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private walletService: WalletService
  ) { }

  OnChanges(changes: SimpleChanges): void {
    if (changes["resetForm"] && changes["resetForm"].currentValue) {
      if (this.resetForm === true) {
        this.form.reset()
      }
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadWallets()
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [FORMATTEDDATE, Validators.required],
      end_date: [FORMATTEDDATE, Validators.required],
      limit_amount: [0, Validators.required],
      current_amount: [0, Validators.required],
      repeat: ['', Validators.required],
      categories: ['', Validators.required],  // Inicializamos como array vacío para el manejo de categorías
      walletId: [0, Validators.required],  // Valor por defecto
      active: [true], //
      percentage: [0]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        walletId: Number(this.form.value.walletId), // Convertir a número
      };
      console.log(formData);
      this.dataBudget.emit({ budget: { ...formData } });
      this.form.reset({
        name: '',
        description: '',
        date: FORMATTEDDATE,
        end_date: FORMATTEDDATE,
        limit_amount: 0,
        current_amount: 0,
        repeat: '',
        categories: '', // Aquí depende si es un string o un array
        walletId: 0,
        active: true,
        percentage: 0,
      });
    } else {
      console.log('Form is invalid');
    }
  }

  toggleCategory(categoryValue: string) {
    if (this.selectedCategories.includes(categoryValue)) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== categoryValue);
    } else {
      this.selectedCategories.push(categoryValue);
    }

    // Actualizamos el valor del formulario
    this.form.get('categories')?.setValue(this.selectedCategories.toString());
  }

  private loadCategories(): void {
    this.coreService.getCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.categoryData.set(response.data.map(category => {
          return ({
            label: category.name,
            value: category.id,
            color: category.color!
          });
        }));
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  private loadWallets() {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        this.walletsData.set(response.data.map(w => {
          return ({
            label: w.name,
            value: w.id,
          });
        }))
      },
      error: (error: any) => {
        console.error('Error fetching wallets:', error);
      },
    });
  }

}
