import { Component, OnInit } from '@angular/core';
import { FhirService } from './fhir.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  resource: any;
  view: any;
  views: any[] = [];

  constructor(private fhir: FhirService) {}

  ngOnInit(): void {}

  loadResource(url: string) {
    this.fhir.getResource(url).subscribe((r) => {
      this.resource = r;
      // this.view = this.fhir.getView(r);
      this.views = this.fhir.testSplit(r);
    });
  }

  loadView(resource: string) {}
}
