import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from './auth/guard/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./main-content/dashboard.module').then(m => m.DashboardModule),
    // canMatch: [canMatchGuard],
    canActivate: [canActivateGuard],
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
