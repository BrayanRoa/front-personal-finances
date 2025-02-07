import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-main-page',
  templateUrl: './auth-main-page.component.html',
  styleUrls: ['./auth-main-page.component.css']
})
export class AuthMainPageComponent implements OnInit {

  moved = false;
  hideMsg = false;
  title = '';
  message = '';
  button_name = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateContent(false);
  }

  togglePosition() {
    this.hideMsg = true; // Ocultar contenido
    this.moved = !this.moved;
    setTimeout(() => {
      this.updateContent(this.moved); // Actualiza los textos y la ruta
      this.hideMsg = false; // Mostrar contenido nuevamente
    }, 400);
  }

  private updateContent(isMoved: boolean) {
    const content = isMoved
      ? { title: 'Hello, Friend!', message: "Don't have an account? Sign up now.", button_name: 'Go to Login', route: '/auth/register' }
      : { title: 'Welcome Back!', message: "To keep connected with us please login with your personal info.", button_name: 'Go to Register', route: '/auth/login' };

    this.title = content.title;
    this.message = content.message;
    this.button_name = content.button_name;
    this.router.navigate([content.route]);
  }
}
