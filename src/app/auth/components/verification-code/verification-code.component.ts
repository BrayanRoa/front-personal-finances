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

  constructor(
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute

  ) {
    super()
  }
  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('userId')!; // Obtiene el parámetro 'id'
  }
  onCodeChange() {
    if (this.code.length === 4) {
      this.verifyCode(this.code);
    }
  }

  verifyCode(code: string) {
    this.auth.verifyEmail(this.idUser, code).subscribe({
      next: (response) => {
        this.handleResponse(response.status, response.data)
        this.router.navigate(['/auth/login'])
        console.log('Email verified successfully', response)
      },
      error: (error) => {
        this.handleResponse(error.status, error.statusMsg)
        console.error('Error verifying email:', error)
      }
    })
  }

}
