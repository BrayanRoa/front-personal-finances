
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { AuthMainPageComponent } from './pages/auth-main-page/auth-main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth.routing.module';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        AuthRoutingModule,

        // PrimeNG modules
        ButtonModule,
        ProgressSpinnerModule,
        MessagesModule
    ],
    exports: [
        AuthMainPageComponent
    ],
    declarations: [
        AuthMainPageComponent,
        LoginComponent,
        RegisterComponent,
    ],
    providers: [],
})
export class AuthModule { }
