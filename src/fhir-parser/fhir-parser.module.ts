import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetaComponent, PrimitiveComponent } from './dynamic-instance';
import { FhirContainerComponent } from './fhir-container.component';
import { FhirService } from './fhir.service';

@NgModule({
  imports: [CommonModule],
  exports: [FhirContainerComponent],
  declarations: [FhirContainerComponent, MetaComponent, PrimitiveComponent],
  providers: [FhirService],
})
export class FhirParserModule {}
