import {
  Component,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CmpGenericInj } from './cmp-token';
import { FhirService } from './fhir.service';
import { signatureType } from './signatures';

@Component({
  selector: 'fhir-container',
  template: `
    <div class="container" *ngFor="let cmp of cmps; let i = index">
      <div class="header" *ngIf="fhirSrv.showSchema">
        <div><label>Definition:</label>{{ cmp.definition }}</div>
        <div><label>Property binding:</label>{{ cmp.obj.displayProp }}</div>
        <div><label>Class used:</label>{{ getClass(cmp.instance) }}</div>
      </div>
      <div class="content" [ngClass]="{ splitted: fhirSrv.showDefinition }">
        <div class="definition" *ngIf="fhirSrv.showDefinition">
          {{ cmp.definition }}
        </div>
        <ng-container
          *ngComponentOutlet="cmp.instance; injector: cmp.injector"
        ></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['fhir-container.componen.scss'],
})
export class FhirContainerComponent implements OnChanges {
  @Input() resource: any;
  @Input() definition: string;
  @Input() resolved: boolean;

  cmps: any[];

  constructor(private inj: Injector, public fhirSrv: FhirService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['resource'] && this.resource) {
      const signatures = !this.resolved
        ? this.fhirSrv.resolveResource(this.resource, this.definition)
        : this.resource;
      if (signatures) {
        const toRet: any[] = [];
        signatures.forEach((s: any) => {
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
            obj: s,
          });
        });
        this.cmps = toRet;
      }
    }
    // For check
    console.info('[Fhir-container cmps]', '\n', this.cmps);
  }

  private setInj(s: any) {
    return {
      injector: Injector.create({
        providers: [{ provide: CmpGenericInj, useValue: s }],
        parent: this.inj,
      }),
    };
  }
  getClass(instance: ClassDecorator) {
    return instance.name;
  }
}
