import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FhirGetService } from 'src/commons/fhir-get.service';
import { DynamicLoaderService } from './dynamic-loader.service';

@Component({
  selector: 'app-dynamic-loader-content',
  template: `
    <div class="content-title">Selected {{ selected }}</div>
    <div class="content">
      <fhir-container
        [resource]="resource$ | async"
        [definition]="definition"
      ></fhir-container>
    </div>
  `,
  styleUrls: ['dynamic.component.scss'],
})
export class DynamicLoaderContentComponent implements OnInit {
  selected: string;
  resource$: Observable<any>;
  definition: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: DynamicLoaderService,
    private fhirGet: FhirGetService
  ) {
    const toLoadId = this.route.snapshot.queryParams['id'];
    const toLoadType = this.route.snapshot.queryParams['type'];
    this.resource$ = this.fhirGet.getResource(`${toLoadType}/${toLoadId}`);
    this.selected = `${toLoadType}, id: ${toLoadId}`;
    this.definition = toLoadType;
    this.loaderService.pushVisit({
      source: 'detail',
      type: toLoadType,
      id: toLoadId,
    });
  }

  ngOnInit() {}
}