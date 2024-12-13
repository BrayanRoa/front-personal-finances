import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './pages/wallet.component';
import { WalletsRoutingModule } from './wallets-routing.module';



@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletsRoutingModule
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletsModule { }
