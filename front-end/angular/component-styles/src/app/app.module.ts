import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeroAppComponent } from './hero-app.component';
import { HeroAppMainComponent } from './hero-app-main.compoent';
import { HeroDetailsComponent } from './hero-details.component';
import { HeroControlsComponent } from './hero-controls.component';
import { QuestSummaryComponent } from './quest-summary.component';
import { HeroTeamComponent } from './hero-team.component';
@NgModule({
  declarations: [
    HeroAppComponent,
    HeroAppMainComponent,
    HeroDetailsComponent,
    HeroControlsComponent,
    QuestSummaryComponent,
    HeroTeamComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HeroAppComponent]
})
export class AppModule { }
