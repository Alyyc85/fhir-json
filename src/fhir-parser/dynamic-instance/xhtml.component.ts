import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-xhtml',
  template: `
    <div>
      <label>{{ obj.options.displayProp }}:</label
      ><span [innerHTML]="obj.content"></span>
    </div>
  `,
  styleUrls: ['instance.scss'],
})
export class XhtmlComponent implements OnInit {
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {}
}
