import { Component, OnInit } from '@angular/core';
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
  loading: boolean = true

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
    const password = this.form.get("password")?.value.trim();
    const confirmPassword = this.form.get("confirm")?.value.trim();

    if (password !== confirmPassword) {
      this.showMessage = true;
      setTimeout(() => (this.showMessage = false), 5000);
      return;
    }

    const { confirm, ...person } = this.form.value;

    this.auth.register(person).subscribe({
      next: ({ data }) => {
        this.idUser = data;
        this.router.navigate([`/auth/verify-code/${this.idUser}`]);
        console.log("User registered successfully");
      },
      error: ({ error }) => {
        this.handleResponse(error.status, error.data);
        console.error("Error registering user:", error);
      }
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

      // console.log(`Token recibido de ${provider}:`, idToken);

      if (!idToken) {
        throw new Error(`No se recibió el token de ${provider}`);
      }

      await this.auth.registerFirebase(idToken).toPromise();
      // console.log(`Registro exitoso en backend con ${provider}`);

      await this.auth.loginWithToken(idToken).toPromise();
      // console.log(`Inicio de sesión exitoso con ${provider}`);

      this.handleSuccessfulLogin();
      this.router.navigate(['/main/dashboard']);
    } catch (error: any) {
      // console.error(`Error en inicio de sesión con ${provider}:`, error);
      this.handleResponse(error?.error?.status, error?.error?.data);
    } finally {
      this.hideLoadingSpinner();
    }
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
}
