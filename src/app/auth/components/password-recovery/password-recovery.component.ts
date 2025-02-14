import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent extends BaseComponent {

  form!: FormGroup
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    super()
    this.formConfig()
  }

  formConfig() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.form.get("email")?.value.trim()
    if (email) {
      this.auth.passwordRecovery(email).subscribe({
        next: () => {
          setTimeout(() => {
            this.loading = false;
            this.router.navigate([`/auth/verify-code/${email}`], { queryParams: { mode: 'password-reset' } });
          }, 1000)
        },
        error: (error) => {
          setTimeout(() => {
            this.loading = false;
            this.handleResponse(error.error.status, error.error.data)
          }, 1000)
        }
      })
    }
  }
}
