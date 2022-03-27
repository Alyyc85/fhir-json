import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicLoaderService } from 'src/pages/dynamic-loader/dynamic-loader.service';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-reference',
  template: `
    <div>
      <label>{{ obj.displayProp }}:</label
      ><a (click)="navigateReference()">{{ display }}</a>
    </div>
  `,
  styleUrls: ['instance.scss'],
})
export class ReferenceComponent implements OnInit {
  display: string;
  private url: string;
  constructor(
    @Inject(CmpGenericInj) public obj: Signature,
    private router: Router,
    private route: ActivatedRoute,
    private loaderSrv: DynamicLoaderService
  ) {}

  ngOnInit() {
    this.url = this.obj.content.find(
      (c: { displayProp: string }) => c.displayProp === 'reference'
    )?.content;
    this.display = this.obj.content.find(
      (c: { displayProp: string }) => c.displayProp === 'display'
    )?.content;
  }
  navigateReference() {
    const type = this.url.split('/')[0];
    const id = this.url.split('/')[1];
    this.loaderSrv.pushVisit({ source: 'detail', type, id });
    this.router.navigate(['../detail'], {
      queryParams: { type, id },
      relativeTo: this.route,
    });
  }
}
