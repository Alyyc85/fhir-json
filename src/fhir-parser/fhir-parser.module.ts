import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateFnsModule, FormatPipe } from 'ngx-date-fns';
import { dynamicCmpsArr } from './dynamic-instance';
import { FhirContainerComponent } from './fhir-container.component';
import { FhirService } from './fhir.service';

@NgModule({
  imports: [CommonModule, DateFnsModule],
  exports: [FhirContainerComponent],
  declarations: [FhirContainerComponent, ...dynamicCmpsArr],
  providers: [FhirService, FormatPipe],
})
export class FhirParserModule {}
