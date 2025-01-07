import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormFieldConfig } from '../../interfaces/generic-components/form.interface';
import { Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() fields: FormFieldConfig[] = [];
  @Input() submitButton: 'save' | 'update' | 'login' | 'register' = 'save';
  @Input() cancelButton = 'Cancel';
  @Input() showCancelButton = true;
  // @Input() showErrors = true;
  // @Input() submitDisabled = false;
  // @Input() showSaveButton = true;
  // @Input() title = '';
  @Input() data: any

  @Input() md_responsive!: 'md:col-6' | 'md:col-3' | '';
  // md_responsive: 'md:col-6' = "md:col-6"
  // @Input() submitDisabled = false;
  // @Input() cancelButtonVisible = true;
  // @Input() showErrors = true;
  @Output() sendForm = new EventEmitter<{ id?: number, data: FormGroup, action: string }>();
  @Output() cancel = new EventEmitter<void>()
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.trackFormChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.populateFormData();
      console.log("SI ENTRE");
    }
  }

  createForm(): void {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = [
        field.value || '',
        this.mapValidations(field.validations || []),
      ];
    });
    this.form = this.fb.group(group);

    console.log("EL FORMULARIO", this.form);
  }

  getErrors(fieldName: string): string[] {
    const control = this.form.get(fieldName);
    if (!control || !control.errors) return [];
    return Object.keys(control.errors).map(err => {
      if (err === 'required') return `${fieldName} is required`;
      // if (err === 'minlength') return `${fieldName} must be at least ${control.errors[err].requiredLength} characters`;
      // Otros errores...
      return `${fieldName} is invalid`;
    });
  }


  private mapValidations(validations: any[]): ValidatorFn[] {
    const validatorFns: ValidatorFn[] = [];

    validations.forEach(validation => {
      if (validation.required) {
        validatorFns.push(Validators.required);
      }
      if (validation.min !== undefined) {
        validatorFns.push(Validators.min(validation.min));
      }
      if (validation.max !== undefined) {
        validatorFns.push(Validators.max(validation.max));
      }
      if (validation.pattern) {
        validatorFns.push(Validators.pattern(validation.pattern));
      }
    });

    return validatorFns;
  }


  onSubmit(): void {
    if (this.submitButton !== 'update') {
      this.sendForm.emit({ data: this.form, action: this.submitButton });
    } else if (this.submitButton === 'update') {
      console.log("a", this.form.value);
      this.sendForm.emit({ data: this.form, action: 'update' });
    }
    this.assignDefaultValues()
  }

  onCancel(): void {
    this.assignDefaultValues()
    this.cancel.emit();
  }

  assignDefaultValues() {
    const defaultValues = this.fields.reduce((acc, field) => {
      acc[field.name] = field.value || ''; // Usa el valor predeterminado o un valor vacío
      return acc;
    }, {} as { [key: string]: any });
    this.form.reset(defaultValues)
  }

  populateFormData() {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
      });
    }
  }

  trackFormChanges(): void {
    this.form.valueChanges.subscribe(values => {
      console.log('Estado actual del formulario:', values);
      console.log('Formulario válido:', this.form.valid);
    });
  }


}
