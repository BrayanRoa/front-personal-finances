
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { AuthMainPageComponent } from './pages/auth-main-page/auth-main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth.routing.module';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';

@NgModule({ exports: [
        AuthMainPageComponent
    ],
    declarations: [
        AuthMainPageComponent,
        LoginComponent,
        RegisterComponent,
    ], imports: [RouterModule,
        ReactiveFormsModule,
        CommonModule,
        AuthRoutingModule,
        // PrimeNG modules
        ButtonModule,
        ProgressSpinnerModule,
        MessagesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
