import { Component, OnInit } from '@angular/core';
import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';
import { FORM_CONFIG_REGISTER } from '../../statics/auth.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { AuthService } from '../../../core/service/auth.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  form!: FormGroup

  messages: Message[] | undefined;
  showMessage: boolean = false;
  idUser: string = ""

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    super()
    this.formConfig()
  }

  ngOnInit(): void {
    // this.formConfig = FORM_CONFIG_REGISTER
    this.messages = [
      { severity: 'error', detail: 'The passwords dont match' },
    ];
  }

  formConfig() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    });

    console.log(this.form.value);
  }


  verifyRegister(): void {
    console.log("object");
    if (this.form.get("password")?.value !== this.form.get("confirm")?.value) {
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
        return
      }, 5000)
    } else {
      const { confirm, ...person } = this.form.value
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

  }

}
