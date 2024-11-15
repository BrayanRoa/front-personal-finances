import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthMainPageComponent } from './pages/auth-main-page/auth-main-page.component';

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
