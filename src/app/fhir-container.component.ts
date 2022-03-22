import {
  Component,
  InjectionToken,
  Injector,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { FhirDynamicDirective } from './fhir-dynamic.directive';
import { MetaComponent } from './meta.component';
import { PrimitiveComponent } from './primitive.component';
export const CmpGenericInj = new InjectionToken<any>('cmpGenericInj');
const instances = [
  { signature: 'meta', instance: MetaComponent },
  { signature: 'id', instance: PrimitiveComponent },
  { signature: 'instant', instance: PrimitiveComponent },
];

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
  @Input() signatures: { signature: string; content: any; prop?: string }[] =
    [];
  @ViewChild(FhirDynamicDirective, { static: true })
  cmps: any[] = [];
  constructor(private inj: Injector) {}

  public ngOnChanges(): void {
    console.log(this.signatures);
    if (this.signatures) {
      const toRet: any[] = [];
      this.signatures.forEach((s) => {
        console.log(s, 'SS');
        if (!s) {
          return;
        }
        const instance = instances.find((c) => c.signature === s.signature);
        if (!instance) {
          return;
        }
        toRet.push({
          ...this.setInj(s),
          instance: instance.instance,
          signature: instance.signature,
          prop: s.prop,
        });
      });
      this.cmps = toRet;
      console.log(this.cmps);
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
