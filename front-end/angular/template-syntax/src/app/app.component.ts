import { Component } from '@angular/core';
import { Hero } from './hero';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'template-syntax';
  isUnchanged = false;
  classes = 'bold';
  currentHero = {
    name: 'Yilidan',
    id: 6,
  };
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(2, 'Mag'),
    new Hero(3, 'Drake')
  ]

  getVal() {
    return 1;
  }
  
  deleteHero() {
    this.heroes.pop();
  }

  onSave() {
    console.log('保存啦');
  }
}
