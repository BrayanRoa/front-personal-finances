import { Component, EventEmitter, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FORMATTEDDATE, RECURRING_TRANSACTION_BUDGET } from '../../../../shared/constants/constants';
import { WalletService } from '../../../wallets/service/wallet.service';
import { CoreService } from '../../../../core/service/core.service';
import { BudgetData } from '../../interfaces/budget.interface';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-form-add-update-budget',
  templateUrl: './form-add-update-budget.component.html',
  styleUrl: './form-add-update-budget.component.css'
})
export class FormAddUpdateBudgetComponent extends BaseComponent implements OnInit {

  // DATA FORM
  form!: FormGroup
  recurring_transactions = RECURRING_TRANSACTION_BUDGET
  walletsData = signal<{ label: string, value: any }[]>([]);
  categoryData = signal<{ label: string, value: any, color: string }[]>([]);

  selectedCategories: string[] = [];

  @Input()
  nameButton: "Save" | "Update" = "Save"
  @Input()
  budget!: BudgetData | null

  @Output()
  cancel = new EventEmitter<void>()

  @Output()
  sendBudget = new EventEmitter<({ budget: BudgetData, action: string })>

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private coreService: CoreService
  ) {
    super()
    this.formConfig()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["budget"] && changes["budget"].currentValue) {
      this.populateFormData()
    }
  }
  ngOnInit(): void {
    this.loadCategories()
    this.loadWallets()
    this.applyChangesInDate()

  }

  applyChangesInDate() {
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

  formConfig() {
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

  onCancel() {
    this.formConfig()
    this.applyChangesInDate()
    this.cancel.emit()
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
    this.selectedCategories = [];
  }

  onSubmit() {
    if (!this.form.invalid) {
      if (this.nameButton === 'Save') {
        const data = this.form.getRawValue()
        data.walletId = +data.walletId;
        this.sendBudget.emit({ budget: data, action: 'save' })
      } else if (this.nameButton === 'Update') {
        const data = this.form.getRawValue()
        data.id = this.budget!.id;
        data.walletId = +data.walletId;
        data.limit_amount = +data.limit_amount;
        data.current_amount = +data.current_amount;
        data.percentage = +data.percentage;
        this.sendBudget.emit({ budget: data, action: 'update' })
      }
    } else {
      console.log("invalid form!");
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
        this.categoryData.set(response.data.filter(category => category.name !== "INITIAL AMOUNT").map(c => {
          return ({
            label: c.name,
            value: c.id.toString(),
            color: c.color!
          });
        }))
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

  calculateDate() {
    const repeat = this.form.get("repeat")?.value;
    const end_date = this.switchTransaction(this.form.get("date")?.value, repeat);
    // Usar toLocaleDateString para formatear la fecha
    const formattedDate = end_date!.toLocaleDateString("en-CA"); // Formato ISO: YYYY-MM-DD

    this.form.get("end_date")?.setValue(formattedDate);
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
