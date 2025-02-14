import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthMainPageComponent } from './pages/auth-main-page/auth-main-page.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
    {
        path: '',
        component: AuthMainPageComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'verify-code/:userId',
                component: VerificationCodeComponent
            },
            {
                path: 'password-recovery',
                component: PasswordRecoveryComponent
            },
            {
                path: 'reset-password/:userId/:code',
                component: ResetPasswordComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
    providers: [],
})
export class AuthRoutingModule { }
