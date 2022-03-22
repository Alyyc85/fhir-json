import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FhirContainerComponent } from './fhir-container.component';
import { FhirDynamicDirective } from './fhir-dynamic.directive';
import { MetaComponent } from './meta.component';
import { PrimitiveComponent } from './primitive.component';

@NgModule({
  declarations: [
    AppComponent,
    MetaComponent,
    FhirDynamicDirective,
    FhirContainerComponent,
    PrimitiveComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
