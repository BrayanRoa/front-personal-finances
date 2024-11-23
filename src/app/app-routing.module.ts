import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from './auth/guard/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
    // canMatch: [canMatchGuard],
    canActivate: [canActivateGuard], // Protege todo el layout con el guard
  },
  {
    path: '**',
    redirectTo: 'auth', // Ruta por defecto para redireccionar
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
