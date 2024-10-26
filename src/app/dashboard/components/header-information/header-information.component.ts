import { Component } from '@angular/core';
import { LoginService } from '../../../login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-information',
  templateUrl: './header-information.component.html',
  styleUrl: './header-information.component.css'
})
export class HeaderInformationComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  onLogout(){
    this.loginService.logout();
    setTimeout(() => this)
    this.router.navigate(['/login']);
  } 

}
