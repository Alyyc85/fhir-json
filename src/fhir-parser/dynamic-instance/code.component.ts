import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-code',
  template: `
    <div>
      <label>{{ obj.options.displayProp }}:</label
      ><code>{{ obj.content }}</code>
    </div>
  `,
  styleUrls: ['instance.scss'],
})
export class CodeComponent implements OnInit {
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {}
}
