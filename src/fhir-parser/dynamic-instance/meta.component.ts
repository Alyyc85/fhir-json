import { Component, Inject, OnInit } from '@angular/core';
import { CmpGenericInj } from '../cmp-token';

@Component({
  selector: 'app-meta',
  template: ` <fhir-container></fhir-container> `,
})
export class MetaComponent implements OnInit {
  views: any[];
  constructor(@Inject(CmpGenericInj) public content: any) {
    console.log(content, 'salve');
    this.views = this.content;
  }

  ngOnInit() {}
}
