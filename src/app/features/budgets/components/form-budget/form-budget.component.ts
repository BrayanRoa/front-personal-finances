import { Component, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../../../../core/service/core.service';
import { WalletService } from '../../../wallets/service/wallet.service';
import { FORMATTEDDATE, RECURRING_TRANSACTION_BUDGET } from '../../../../shared/constants/constants';
import { BudgetData } from '../../interfaces/budget.interface';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-form-budget',
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.css'
})
export class FormBudgetComponent extends BaseComponent {

  walletsData = signal<{ label: string, value: any }[]>([]);
  categoryData = signal<{ label: string, value: any, color: string }[]>([]);
  recurring_transactions = RECURRING_TRANSACTION_BUDGET

  // save budget
  @Output()
  dataBudget = new EventEmitter<({ budget: BudgetData })>

  @Output()
  updateBudget = new EventEmitter<({ budget: BudgetData, id: number })>

  // cancel and clean the form data
  @Output()
  closeModal = new EventEmitter<boolean>(false)

  @Input()
  budget!: BudgetData | null
  @Input()
  nameButton: 'Save' | 'Update' = "Save"

  form!: FormGroup;

  selectedCategories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private walletService: WalletService
  ) {
    super();
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [FORMATTEDDATE, Validators.required],
      end_date: [FORMATTEDDATE, Validators.required],
      limit_amount: [0, Validators.required],
      current_amount: [0, Validators.required],
      repeat: ['', Validators.required],
      categories: [[], Validators.required],  // Inicializamos como array vacío para el manejo de categorías
      walletId: [0, Validators.required],  // Valor por defecto
      active: [true], //
      percentage: [0]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["budget"] && changes["budget"].currentValue) {
      this.populateFormData()
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadWallets()

    // si modifica el repeat se recalcula el end_date
    this.form.get('repeat')?.valueChanges.subscribe((repeatValue) => {
      if (repeatValue && repeatValue !== 'NEVER') {
        // this.setCalculatedEndDate(repeatValue);
        this.form.get('end_date')?.disable();
        this.calculateDate()
      } else {
        this.form.get('end_date')?.enable();
        this.form.get('end_date')?.reset(); // Limpia el valor si es "customized"
      }
    });

    // si modifica la fecha se calcula el end_date
    this.form.get("date")?.valueChanges.subscribe((date) => {
      this.calculateDate()
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue(); // Obtiene todos los valores, incluidos los desactivados

      if (this.nameButton === 'Update') {
        this.updateBudget.emit({ budget: { ...formValue as BudgetData }, id: this.budget?.id! });
      } else {
        const data = {
          ...formValue,
          walletId: Number(formValue.walletId),
        };
        this.dataBudget.emit({ budget: data });
      }
      this.resetForm();
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.form.reset({
      name: '',
      description: '',
      date: FORMATTEDDATE,
      end_date: FORMATTEDDATE,
      limit_amount: 0,
      current_amount: 0,
      repeat: '',
      categories: [], // Aquí depende si es un string o un array
      walletId: 0,
      active: true,
      percentage: 0,
    });
    this.closeModal.emit(true)
    this.selectedCategories = [];
  }

  // me da solo los campos que se modificaron
  getModifiedFields(): { [key: string]: any } {
    const modifiedFields: { [key: string]: any } = {};
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control?.dirty) {
        modifiedFields[key] = control.value;
      }
    });
    return modifiedFields;
  }

  calculateDate() {
    const repeat = this.form.get("repeat")?.value;
    const end_date = this.switchTransaction(this.form.get("date")?.value, repeat);

    // Usar toLocaleDateString para formatear la fecha
    const formattedDate = end_date!.toLocaleDateString("en-CA"); // Formato ISO: YYYY-MM-DD

    this.form.get("end_date")?.setValue(formattedDate);
  }


  toggleCategory(categoryValue: string) {
    if (this.selectedCategories.includes(categoryValue)) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== categoryValue);
    } else {
      this.selectedCategories.push(categoryValue);
    }

    // Actualizamos el valor del formulario
    this.form.get('categories')?.setValue(this.selectedCategories.toString());
    console.log("ENTRE", this.form.value);

  }

  private loadCategories(): void {
    this.coreService.getCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.categoryData.set(response.data.map(category => {
          return ({
            label: category.name,
            value: category.id.toString(),
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

  populateFormData() {
    if (this.budget) {
      this.form.patchValue({
        ...this.budget,
        date: new Date(this.budget.date).toISOString().split('T')[0],
        end_date: new Date(this.budget.end_date).toISOString().split('T')[0],
        categories: this.budget.BudgetCategories?.map(category => category.categoryId).toString()
      });

      // Actualizar el array de categorías seleccionadas
      this.selectedCategories = this.budget.BudgetCategories?.map(category => category.categoryId.toString()) || [];
      this.form.get('categories')?.setValue(this.selectedCategories.toString());
    }
  }


}
