import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FORM_CONFIG_LOGIN } from '../../statics/auth.config';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit {

  formConfig!: FormFieldConfig[] | null;

  public loading: boolean = true;

  errorMessage: Message[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super()
  }
  ngOnInit(): void {
    this.formConfig = FORM_CONFIG_LOGIN
  }

  public onLogin(value: { data: FormGroup, action: string }): void {
    const email = value.data.value.email;

    this.showLoadingSpinner();
    this.authService.login(value.data.value).subscribe({
      next: () => {
        this.handleSuccessfulLogin();
      },
      error: (error) => {
        this.handleLoginError(error, email);
      },
    });
  }

  private handleSuccessfulLogin(): void {
    setTimeout(() => {
      this.hideLoadingSpinner();
      this.router.navigate(['/main/dashboard']);
    }, 3000);
  }

  private handleLoginError(error: any, email: string): void {
    if (error.error.status === 403) {
      this.handleForbiddenError(email);
    } else {
      this.displayErrorMessage(error);
    }
  }

  private handleForbiddenError(email: string): void {
    this.confirmAction().then((action) => {
      if (action && email) {
        this.resendVerificationCode(email);
      } else {
        console.error('El email no tiene valor válido');
      }
    });
  }

  private resendVerificationCode(email: string): void {
    this.authService.resentCode(email).subscribe({
      next: (response) => {
        this.router.navigate([`/auth/verify-code/${response.data}`]);
      },
      error: (error) => {
        console.error('Error enviando código:', error);
      },
    });
  }

  private displayErrorMessage(error: any): void {
    setTimeout(() => {
      this.hideLoadingSpinner();
      this.errorMessage = [
        { severity: 'error', summary: `Error: ${error.error.data}` },
      ];
    }, 2000);
  }

  private showLoadingSpinner(): void {
    this.loading = false; // Muestra el spinner de carga
  }

  private hideLoadingSpinner(): void {
    this.loading = true; // Oculta el spinner de carga
  }


}
