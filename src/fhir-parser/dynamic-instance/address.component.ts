import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-address',
  template: `
    <fhir-container
      [resource]="obj.content[0]"
      [resolved]="true"
    ></fhir-container>
  `,
})
export class AddressComponent implements OnInit {
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {}
}
