import { Component, Injector, Input, OnChanges } from '@angular/core';
import { CmpGenericInj } from './cmp-token';
import { FhirService } from './fhir.service';
import { signatureType } from './signatures';

@Component({
  selector: 'fhir-container',
  template: `
    <fieldset *ngFor="let cmp of cmps; let i = index">
      <legend>{{ cmp.prop }}, definitions:{{ cmp.signature }}</legend>
      <ng-container
        *ngComponentOutlet="cmp.instance; injector: cmp.injector"
      ></ng-container>
    </fieldset>
  `,
})
export class FhirContainerComponent implements OnChanges {
  @Input() resource: any;
  @Input() definition: string;

  cmps: any[];

  constructor(private inj: Injector, private fhirSrv: FhirService) {}

  public ngOnChanges(): void {
    if (this.resource && this.definition) {
      const signatures = this.fhirSrv.resolveResource(
        this.resource,
        this.definition
      );
      console.log(signatures, 'signatures');
      if (signatures) {
        const toRet: any[] = [];
        signatures.forEach((s) => {
          console.log(s, 'S');
          if (!s) {
            return;
          }
          const instance = signatureType.find(
            (c) => c.definition === s.definition
          );
          if (!instance) {
            return;
          }
          toRet.push({
            ...this.setInj(s),
            ...instance,
          });
        });
        this.cmps = toRet;
        console.log(this.cmps);
      }
    }
  }

  private setInj(s: any) {
    return {
      injector: Injector.create({
        providers: [{ provide: CmpGenericInj, useValue: s.content }],
        parent: this.inj,
      }),
    };
  }
}
