import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-primitive',
  template: `
    <div>
      <label>{{ obj.options.displayProp }}:</label>{{ display }}
    </div>
    <label> </label>
  `,
})
export class PrimitiveComponent implements OnInit {
  display: string;
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {
    if (this.obj) {
      this.display =
        typeof this.obj.content === 'boolean' && this.obj
          ? 'Si'
          : typeof this.obj.content === 'boolean' && !this.obj
          ? 'No'
          : typeof this.obj.content === 'string'
          ? this.obj.content
          : this.obj.content.toString();
    }
  }
}
