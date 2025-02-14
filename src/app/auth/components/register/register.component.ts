import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent {

  form!: FormGroup

  idUser: string = ""
  loading: boolean = true
  blockButton: boolean = false
  showPassword: boolean = false
  showConfirmPassword: boolean = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    super()
    this.formConfig()
  }


  formConfig() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
    });
  }


  verifyRegister(): void {
    this.blockButton = true
    const password = this.form.get("password")?.value.trim();
    const confirmPassword = this.form.get("confirm")?.value.trim();

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      return;
    }


    if (password !== confirmPassword) {
      this.handleResponse(0, "Password don't match")
      this.blockButton = false;
      return;
    }

    const { confirm, ...person } = this.form.value;

    this.auth.register(person)
      .pipe(finalize(() => {
        this.blockButton = false
      }))
      .subscribe({
        next: ({ data }) => {
          this.idUser = data;
          this.router.navigate([`/auth/verify-code/${this.idUser}`], { queryParams: { mode: 'email-verification' } });
        },
        error: ({ error }) => {
          this.handleResponse(error.status, error.data);
        },
      });
  }


  async onSocialSignUp(provider: 'google' | 'github', event?: Event) {
    event?.preventDefault();
    this.showLoadingSpinner();

    try {
      // Seleccionar el proveedor según el parámetro
      const idToken = provider === 'google'
        ? await this.auth.signUpWithGoogle()
        : await this.auth.signUpWithGitHub();

      if (!idToken) {
        throw new Error(`No se recibió el token de ${provider}`);
      }

      await this.auth.registerFirebase(idToken).toPromise();

      await this.auth.loginWithToken(idToken).toPromise();

      this.handleSuccessfulLogin();
      this.router.navigate(['/main/dashboard']);
    } catch (error: any) {
      this.handleResponse(error?.error?.status, error?.error?.data);
    } finally {
      this.hideLoadingSpinner();
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName) && this.form.controls[controlName].touched;
  }

  private handleSuccessfulLogin(): void {
    setTimeout(() => {
      this.hideLoadingSpinner();
      this.router.navigate(['/main/dashboard']);
    }, 3000);
  }

  private hideLoadingSpinner(): void {
    this.loading = true; // Oculta el spinner de carga
  }

  private showLoadingSpinner(): void {
    this.loading = false; // Muestra el spinner de carga
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
