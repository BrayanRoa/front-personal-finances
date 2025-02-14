import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css'
})
export class VerificationCodeComponent extends BaseComponent implements OnInit {

  code: string = ""
  idUser: string = ""
  mode: 'email-verification' | 'password-reset' = 'email-verification';
  loading: boolean = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute

  ) {
    super()
  }
  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('userId')!; // Obtiene el parámetro 'id'
    this.mode = this.activeRoute.snapshot.queryParamMap.get('mode') as 'email-verification' | 'password-reset' || 'email-verification';
  }
  onCodeChange() {
    if (this.code.length === 4) {
      this.verifyCode(this.code);
    }
  }

  verifyCode(code: string) {
    this.loading = true;
    if (this.mode === 'email-verification') {
      this.auth.verifyEmail(this.idUser, code, "register").subscribe({
        next: (response) => {
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/auth/login']);
            this.handleResponse(response.status, response.data);
          }, 1000)
        },
        error: (error) => {
          setTimeout(() => {
            this.loading = false;
            this.handleResponse(error.error.status, error.error.data);
          }, 1000)
        }
      });
    } else if (this.mode === 'password-reset') {
      this.auth.verifyEmail(this.idUser, code, "change-password").subscribe({
        next: (response) => {
          setTimeout(() => {
            this.loading = false;
            this.router.navigate([`/auth/reset-password/${this.idUser}/${code}`]);
          }, 1000)
        },
        error: (error) => {
          setTimeout(() => {
            this.loading = false;
            this.handleResponse(error.error.status, error.error.data);
          }, 1000)
        }
      });
    }
  }

  resendCode(event: Event) {
    event.preventDefault(); // Evitar el envío del formulario si aplica
    this.loading = true;
    this.auth.resentCode(this.idUser).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.loading = false;
          this.handleResponse(response.status, response.data);
        }, 1000)
      },
      error: (error) => {
        setTimeout(() => {
          this.loading = false;
          this.handleResponse(error.status, error.statusMsg);
        }, 1000)
      }
    });
  }


}
