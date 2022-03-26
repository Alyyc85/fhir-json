import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-narrative',
  template: `
    <fhir-container [resource]="obj.content" [resolved]="true"></fhir-container>
  `,
})
export class NarrativeComponent implements OnInit {
  views: any[];
  constructor(@Inject(CmpGenericInj) public obj: Signature) {}

  ngOnInit() {}
}
