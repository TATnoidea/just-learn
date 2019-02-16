import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { heroSwitchComponents } from './hero-switch.component';
import { UnlessDirective } from './unless.directive';
// import {  }
@NgModule({
  declarations: [
    AppComponent,
    heroSwitchComponents,
    UnlessDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
