import { Component, OnInit } from '@angular/core';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FORM_CONFIG_REGISTER } from '../../statics/auth.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { AuthService } from '../../../core/service/auth.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { Router } from '@angular/router';
import { CommonResponse } from '../../../shared/interfaces/common-response.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  formConfig!: FormFieldConfig[] | null;
  messages: Message[] | undefined;
  showMessage: boolean = false;
  // verifyEmail: boolean = false;
  // code: string = ""
  idUser: string = ""

  // otpControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(/^\d{4}$/), // Ensures exactly 4 digits
  // ]);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    super()
  }

  ngOnInit(): void {
    this.formConfig = FORM_CONFIG_REGISTER
    this.messages = [
      { severity: 'error', detail: 'The passwords dont match' },
    ];
  }

  verifyRegister(value: { data: FormGroup, action: string }) {
    // Implement your logic for verifying register data
    // For example, you can send a verification email or check if the email is already registered
    if (value.data.value.password !== value.data.value.confirm) {
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
        return
      }, 5000)
    }

    const { confirm, ...person } = value.data.value
    this.auth.register(person).subscribe({
      next: (response) => {
        // this.verifyEmail = true
        this.idUser = response.data
        this.router.navigate([`/auth/verify-code/${this.idUser}`]);
        console.log('User registered successfully')
      },
      error: (err) => {
        this.handleResponse(err.error.status, err.error.data)
        console.error('Error registering user:', err)
      }
    })
  }

  // onCodeChange() {
  //   if (this.code.length === 4) {
  //     this.verifyCode(this.code);
  //   }
  // }

  // verifyCode(code: string) {
  //   this.auth.verifyEmail(this.idUser, code).subscribe({
  //     next: (response) => {
  //       this.handleResponse(response.status, response.data)
  //       this.verifyEmail = false
  //       this.router.navigate(['/auth/login'])
  //       console.log('Email verified successfully', response)
  //     },
  //     error: (error) => {
  //       this.handleResponse(error.status, error.statusMsg)
  //       console.error('Error verifying email:', error)
  //     }
  //   })
  // }
}
