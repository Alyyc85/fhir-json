import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatPipe } from 'ngx-date-fns';
import { FhirGetService } from 'src/commons/fhir-get.service';
import { DynamicLoaderService } from './dynamic-loader.service';

@Component({
  selector: 'app-dynamic-loader-list',
  template: `
    <div class="content-title">Choose {{ title }}</div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Last updated</th>
            <th>Full url</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of list">
            <td>{{ item.resource.resourceType }}/{{ item.resource.id }}</td>
            <td>{{ getDate(item) }}</td>
            <td>{{ item.fullUrl }}</td>
            <td><a (click)="openDetail(item)">detail</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['dynamic.component.scss'],
})
export class DynamicLoaderListComponent implements OnInit {
  title: string;
  list: any[];
  private _bkList: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fhirGet: FhirGetService,
    private date: FormatPipe,
    private loaderSrv: DynamicLoaderService
  ) {}

  ngOnInit() {
    const toLoad = this.route.snapshot.queryParams['type'];
    this.title = toLoad.toLowerCase();
    this.fhirGet.getResourceList(toLoad).subscribe((res) => {
      this._bkList = res;
      console.log(this._bkList);
      this.list = res;
    });
    this.loaderSrv.pushVisit({ source: 'list', type: toLoad });
  }

  getDate(res: any) {
    const mod = new Date(res.resource.meta.lastUpdated);
    return this.date.transform(mod, `dd/MM/yyyy 'at' HH:mm`);
  }

  openDetail(item: any) {
    this.router.navigate(['detail'], {
      relativeTo: this.route.parent,
      queryParams: { id: item.resource.id, type: item.resource.resourceType },
    });
  }
}
