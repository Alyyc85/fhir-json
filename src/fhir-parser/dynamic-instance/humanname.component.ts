import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-human-name',
  template: `
    <div>
      <label>{{ obj.displayProp }}:</label>{{ display }}
    </div>
  `,
  styleUrls: ['instance.scss'],
})
export class HumanNameComponent implements OnInit {
  display: string;
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {
    if (this.obj) {
      this.display =
        this.obj.content[0].find(
          (c: { displayProp: string }) => c.displayProp === 'given'
        )?.content[0] +
        ' ' +
        this.obj.content[0].find(
          (c: { displayProp: string }) => c.displayProp === 'family'
        )?.content;
    }
  }
}
