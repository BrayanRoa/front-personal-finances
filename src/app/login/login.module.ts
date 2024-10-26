import { NgModule } from '@angular/core';
import { MainPagesComponent } from './pages/main-pages/main-pages.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        RouterModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        
        ButtonModule,
        RippleModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule,
        ProgressSpinnerModule,
        MessagesModule,

        HttpClientModule,
        CommonModule
    ],
    exports: [
        MainPagesComponent
    ],
    declarations: [
        MainPagesComponent,
        RegisterComponent,
        LoginComponent
    ],
    providers: [],
})
export class LoginModule { }
