import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesPageComponent } from './resources-page.component';

const resourceRoutes: Routes = [
  { path: '', component: ResourcesPageComponent },
  {
    path: 'resource',
    loadChildren: () =>
      import('src/pages/dynamic-loader/dynamic-loader.module').then(
        (m) => m.DynamicLoaderModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(resourceRoutes)],
  exports: [],
  declarations: [ResourcesPageComponent],
  providers: [],
})
export class ResourceModule {}
