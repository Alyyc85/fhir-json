import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fhirDynamic]',
})
export class FhirDynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
