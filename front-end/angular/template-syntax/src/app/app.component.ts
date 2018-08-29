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
    birthdate: '1555555555555',
  };
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(2, 'Mag'),
    new Hero(3, 'Drake')
  ];
  hero = {
    id: 2,
    name: 'Windstorm',
    marker: '123'
  };

  tabs = [1, 2, 3, 4];
  currentTab = 1;

  getVal(): number {
    return 1;
  }

  deleteHero(): void {
    this.heroes.pop();
  }

  onSave(): void {
    console.log('保存啦');
  }

  changeTab(tab: number): void {
    this.currentTab = tab;
  }

  callPhone(phone: number): void {
    console.log(phone);
  }

  callFax(fax: number): void {
    console.log(fax);
  }
}
