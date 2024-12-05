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
  @Input() submitButton = 'save';
  @Input() cancelButton = 'Cancel';
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.populateFormData();
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

    console.log("EL FORMULARIO",this.form);
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
    if (this.submitButton === 'save') {
      this.sendForm.emit({ data: this.form, action: 'save' });
    } else if (this.submitButton === 'update') {
      this.sendForm.emit({ data: this.form, action: 'update' });
    }
    console.log("PERRROSSSSS", this.form.value);
    this.form.reset();
  }

  onCancel(): void {
    this.form.reset();
    this.cancel.emit();
  }

  populateFormData() {
    this.form.patchValue(this.data);
    console.log("DAAAAATAAAA", this.form);
  }

}
