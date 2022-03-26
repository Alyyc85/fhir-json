import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FhirGetService } from 'src/commons/fhir-get.service';

@Component({
  selector: 'app-resources-page',
  template: `
    <div class="title">Select a resource</div>
    <div class="content">
      <span
        class="chip"
        *ngFor="let chip of resourceManaged"
        (click)="goTo(chip)"
      >
        <i>{{ chip.total }}</i> {{ chip.type }}
      </span>
    </div>
  `,
  styleUrls: ['resources-page.component.scss'],
})
export class ResourcesPageComponent implements OnInit {
  resourceManaged: { type: string; total: number }[];
  constructor(
    private fhirGet: FhirGetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fhirGet
      .getBoundlesSample()
      .subscribe((val) => (this.resourceManaged = val));
  }

  goTo(chip: { type: string; total: number }) {
    this.router.navigate(['resource', 'list'], {
      queryParams: { type: chip.type },
      relativeTo: this.route,
    });
  }
}
