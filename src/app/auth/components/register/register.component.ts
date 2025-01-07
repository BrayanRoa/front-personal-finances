import { Component, OnInit } from '@angular/core';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FORM_CONFIG_REGISTER } from '../../statics/auth.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formConfig!: FormFieldConfig[] | null;

  ngOnInit(): void {
    this.formConfig = FORM_CONFIG_REGISTER
  }

}
