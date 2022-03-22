import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from './fhir-container.component';

@Component({
  selector: 'app.primitive',
  template: `
    <label>
      <span>{{ display }}</span></label
    >
  `,
})
export class PrimitiveComponent implements OnInit {
  display: string;
  constructor(@Inject(CmpGenericInj) public content: any) {}

  ngOnInit() {
    if (this.content) {
      this.display =
        typeof this.content === 'boolean' && this.content
          ? 'Si'
          : typeof this.content === 'boolean' && !this.content
          ? 'No'
          : typeof this.content === 'string'
          ? this.content
          : this.content.toString();
    }
  }
}
