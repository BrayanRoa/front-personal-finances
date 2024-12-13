import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './pages/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
  }, // Ruta raíz para el Dashboard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule { }
