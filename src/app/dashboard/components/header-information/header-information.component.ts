import { Component } from '@angular/core';
import { LoginService } from '../../../login/service/login.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-information',
  templateUrl: './header-information.component.html',
  styleUrl: './header-information.component.css'
})
export class HeaderInformationComponent {

  items!: MenuItem[];

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.items = [
      {
        label: 'Update',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Delete',
        command: () => {
          this.delete();
        }
      },
      { label: 'Angular Website', url: 'http://angular.io' },
      { separator: true },
      { label: 'Upload', routerLink: ['/fileupload'] }
    ];
  }

  onLogout() {
    // this.loginService.logout();
    // setTimeout(() => this)
    // this.router.navigate(['/login']);
  }

  save(severity: string) {
    // this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
  }
}
