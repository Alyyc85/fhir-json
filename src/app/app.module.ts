import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DateFnsModule } from 'ngx-date-fns';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: 'landing',
    loadChildren: () =>
      import('src/pages/resources/resources.module').then(
        (m) => m.ResourceModule
      ),
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    DateFnsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
