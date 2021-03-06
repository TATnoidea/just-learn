import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-version-child',
  template: `
  <h3>Version {{ major }}.{{ minor }}</h3>
  <h4>Change Log:</h4>
  <ul>
    <li *ngFor='let change of changeLog'>{{ change }}</li>
  </ul>
  `
})
export class VersionChildComponent implements OnChanges {
  @Input() major: number;
  @Input() minor: number;
  changeLog: string[] = [];

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${ propName } set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${ propName } changed from ${ from } to ${ to }`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
}
