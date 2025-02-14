import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent {

  form!: FormGroup
  public loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    super()
    this.formConfig();
  }

  async onSocialSignUp(provider: 'google' | 'github', event?: Event) {
    event?.preventDefault(); // Evitar el envío del formulario si aplica
    this.showLoadingSpinner(); // Mostrar spinner antes de iniciar el proceso

    try {
      const idToken = provider === 'google'
        ? await this.authService.signUpWithGoogle()
        : await this.authService.signUpWithGitHub();

      if (!idToken) {
        throw new Error('No se recibió el token de autenticación');
      }

      // Autenticación en el backend
      this.authService.loginWithToken(idToken).subscribe({
        next: () => {
          this.router.navigate(['/main/dashboard']);
        },
        error: (error) => {
          this.handleResponse(error.error.status, error.error.data);
        },
      });

    } catch (error: any) {
      this.handleResponse(error.error?.status || 500, error.error?.data || 'Error desconocido');
    } finally {
      setTimeout(() => this.hideLoadingSpinner(), 2000); // Esperar 2 segundos antes de ocultar el spinner
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  formConfig() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  public onSubmit(): void {
    this.showLoadingSpinner();
    this.authService.login(this.form.value).subscribe({
      next: () => {
        setTimeout(() => {
          this.hideLoadingSpinner();
          this.router.navigate(['/main/dashboard']);
        }, 2000); // Esperar 2 segundos antes de redirigir
      },
      error: (error) => {
        this.handleResponse(error.error.status, error.error.data);
        setTimeout(() => this.hideLoadingSpinner(), 2000); // También esperar en caso de error
      },
    });
  }

  private showLoadingSpinner(): void {
    this.loading = true; // Muestra el spinner de carga
  }

  private hideLoadingSpinner(): void {
    this.loading = false; // Oculta el spinner de carga
  }
}
