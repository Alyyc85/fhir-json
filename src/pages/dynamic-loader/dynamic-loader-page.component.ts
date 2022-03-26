import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicLoaderService } from './dynamic-loader.service';

@Component({
  selector: 'app-dynamic-loader-page',
  template: `
    <div class="wrapper">
      <aside>
        <app-dynamic-loader-aside></app-dynamic-loader-aside>
      </aside>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['dynamic.component.scss'],
})
export class DynamicLoaderPageComponent implements OnInit, OnDestroy {
  constructor(private loaderService: DynamicLoaderService) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    console.log('destroy');
    this.loaderService.reset();
  }
}
