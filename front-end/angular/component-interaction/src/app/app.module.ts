import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroChildCompoent } from './hero-child.component';
import { HeroParentComponent } from './hero-parent.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroChildCompoent,
    HeroParentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
