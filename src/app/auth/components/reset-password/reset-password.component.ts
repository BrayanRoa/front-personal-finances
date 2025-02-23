import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent extends BaseComponent {

  form!: FormGroup
  email: string = ""
  loading: boolean = false
  showPassword: boolean = false
  showConfirmPassword: boolean = false


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private activeRoute: ActivatedRoute,
  ) {
    super()
    this.email = this.activeRoute.snapshot.paramMap.get('userId')!; // Obtiene el parámetro 'id'
    this.formConfig();
  }

  formConfig() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const password = this.form.get("password")?.value.trim();
    const confirmPassword = this.form.get("confirm")?.value.trim();

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      return;
    }


    if (password !== confirmPassword) {
      this.handleResponse(0, "Password don't match")
      return;
    }

    this.loading = true;

    this.auth.passwordReset(this.email, password).subscribe({
      next: () => {
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        }, 1000)
        //colocar el loading
      },
      error: (error) => {
        setTimeout(() => {
          this.loading = false;
          this.handleResponse(error.status, error.statusMsg);
        }, 1000)
      }
    })
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName) && this.form.controls[controlName].touched;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


}
