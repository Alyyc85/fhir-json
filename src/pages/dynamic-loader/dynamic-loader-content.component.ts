import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { FhirGetService } from 'src/commons/fhir-get.service';
import { FhirService } from 'src/fhir-parser/fhir.service';
import { DynamicLoaderService } from './dynamic-loader.service';

@Component({
  selector: 'app-dynamic-loader-content',
  template: `
    <div class="content-title">Selected {{ selected }}</div>
    <div class="action">
      <button (click)="hideDefinition()">
        {{ fhirSrv.showDefinition ? 'Hide' : 'Show' }} definitions
      </button>
      <button (click)="hideSchema()">
        {{ fhirSrv.showSchema ? 'Hide' : 'Show' }} structure info
      </button>
    </div>
    <div class="content">
      <fhir-container
        [resource]="resource$ | async"
        [definition]="definition"
      ></fhir-container>
    </div>
  `,
  styleUrls: ['dynamic.component.scss'],
})
export class DynamicLoaderContentComponent implements OnInit, OnDestroy {
  selected: string;
  resource$: Observable<any>;
  definition: string;
  private _destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: DynamicLoaderService,
    private fhirGet: FhirGetService,
    public fhirSrv: FhirService
  ) {
    // Sto usando le queryParams per i dati e non le sottorotte
    // Perchè ho allo stesso livello 2 cmp -- rifinibile
    // Quindi imposto la logica solo sul detail
    // che se navigo re-inizializzo i valori
    // tolgo la roba da onInit per evitare 2 passaggi
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this._destroy$)
      )
      .subscribe((e) => {
        this.init();
      });
  }

  ngOnInit() {}

  init() {
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

  hideSchema() {
    this.fhirSrv.showSchema = !this.fhirSrv.showSchema;
  }
  hideDefinition() {
    this.fhirSrv.showDefinition = !this.fhirSrv.showDefinition;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
