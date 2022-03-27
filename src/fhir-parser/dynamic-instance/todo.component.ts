import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-todo',
  template: `
    <div>
      <label
        ><span style="color:red">TODO</span> -
        {{ obj.options.displayProp }}:</label
      >
      <pre><code>{{obj | json}}</code></pre>
    </div>
  `,
  styleUrls: ['instance.scss'],
})
export class TodoComponent implements OnInit {
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {}
}
