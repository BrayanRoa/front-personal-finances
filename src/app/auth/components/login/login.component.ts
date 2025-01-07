import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FORM_CONFIG_LOGIN } from '../../statics/auth.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formConfig!: FormFieldConfig[] | null;


  // public myForm: FormGroup = this.fb.group({
  //   email: ['', [Validators.required]],
  //   password: ['']
  // })

  public loading: boolean = true;

  errorMessage: Message[] = [];

  constructor(
    // private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.formConfig = FORM_CONFIG_LOGIN
  }

  public onLogin(value: { data: FormGroup, action: string }) {
    this.loading = false; // Muestra el spinner de carga
    this.authService.login(value.data.value).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.loading = true; // Oculta el spinner de carga
          this.router.navigate(['/main/dashboard']);
        }, 3000);
      },
      error: (error) => {
        setTimeout(() => {
          this.loading = true; // Oculta el spinner de carga
          this.errorMessage = [
            { severity: 'error', summary: `Error: ${error.error.data}` },
          ];
        }, 2000);
      }
    })
  }

}
