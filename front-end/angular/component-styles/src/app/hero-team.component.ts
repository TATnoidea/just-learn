import { Component, Input } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'app-hero-team',
  template: `
    <link rel='stylesheet' href='../assets/hero-team.component.css'>
    <h3>Team</h3>
    <ul>
      <li *ngFor='let member of hero.team'>{{ member }}</li>
    </ul>
  `
})
export class HeroTeamComponent {
  @Input() hero: Hero;
}
