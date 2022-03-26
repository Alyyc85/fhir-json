import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateFnsModule, FormatPipe } from 'ngx-date-fns';
import { FhirParserModule } from 'src/fhir-parser/fhir-parser.module';
import { DynamicLoaderAsideComponent } from './dynamic-loader-aside.component';
import { DynamicLoaderContentComponent } from './dynamic-loader-content.component';
import { DynamicLoaderListComponent } from './dynamic-loader-list.component';
import { DynamicLoaderPageComponent } from './dynamic-loader-page.component';
import { DynamicLoaderService } from './dynamic-loader.service';

const dynamicRoutes: Routes = [
  {
    path: '',
    component: DynamicLoaderPageComponent,
    children: [
      {
        path: 'list',
        component: DynamicLoaderListComponent,
      },
      {
        path: 'detail',
        component: DynamicLoaderContentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dynamicRoutes),
    DateFnsModule,
    FhirParserModule,
  ],
  exports: [],
  declarations: [
    DynamicLoaderAsideComponent,
    DynamicLoaderContentComponent,
    DynamicLoaderPageComponent,
    DynamicLoaderListComponent,
  ],
  providers: [FormatPipe, DynamicLoaderService],
})
export class DynamicLoaderModule {}
