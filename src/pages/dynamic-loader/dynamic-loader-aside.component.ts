import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicLoaderService, UrlVisited } from './dynamic-loader.service';

@Component({
  selector: 'app-dynamic-loader-aside',
  template: `
    <div class="aside-title">
      Callstack ---
      <small (click)="homeClick()"><em>back to Home</em></small>
    </div>
    <ul>
      <li *ngFor="let link of visited$ | async">
        <a (click)="linkClicked(link)"
          >{{ link.source }} - {{ link.type
          }}{{ link.id ? '/' + link.id : '' }}</a
        >
      </li>
    </ul>
  `,
  styleUrls: ['dynamic.component.scss'],
})
export class DynamicLoaderAsideComponent implements OnInit {
  visited$: Observable<UrlVisited[]>;
  constructor(
    private loaderSrv: DynamicLoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.visited$ = this.loaderSrv.getUrl$();
  }

  ngOnInit() {}

  linkClicked(link: UrlVisited) {
    this.loaderSrv.removeOthers(link);
    let params: any = { type: link.type };
    if (link.id) {
      params = { ...params, id: link.id };
    }
    this.router.navigate([link.source], {
      queryParams: params,
      relativeTo: this.route.parent,
    });
  }

  homeClick() {
    this.router.navigate(['landing']);
  }
}
