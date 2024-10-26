import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['']
  })

  public loading: boolean = true;

  errorMessage: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router:Router
  ) { }

  public onLogin() {
    this.loading = false; // Muestra el spinner de carga

    this.loginService.login(this.myForm.value).subscribe({
      next: (data) => {
        console.log(data);
        setTimeout(() => {
          this.loading = true; // Oculta el spinner de carga
          this.router.navigate(['/dashboard/control']);
        }, 3000);
      },
      error: (error) => {
        setTimeout(() => {
          this.loading = true; // Oculta el spinner de carga
          this.errorMessage = [
            { severity: 'error', summary: `Error: ${error.error.data}` },
          ];
        }, 2000);
        this.myForm.reset()
      }
    })
  }
}
