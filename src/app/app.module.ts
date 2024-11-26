import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { RippleModule } from 'primeng/ripple';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    BrowserAnimationsModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
