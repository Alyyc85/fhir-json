import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { baseUrl } from './consts';

@Injectable({ providedIn: 'root' })
export class FhirGetService {
  constructor(private http: HttpClient) {}

  getResource(url: string) {
    return this.http.get(`${baseUrl}${url}`);
  }

  getResourceList(type: string) {
    return this.http
      .get(`${baseUrl}${type}?_count=20&_summary=true`)
      .pipe(map((val) => (val as any).entry));
  }

  getBoundlesSample() {
    const resourcesManaged = [
      'Patient',
      'Practitioner',
      'Organization',
      'Medication',
    ];
    const calls: any[] = [];
    resourcesManaged.forEach((r) => {
      calls.push(this.http.get(`${baseUrl}?_type=${r}&_summary=count`));
    });
    return forkJoin(calls).pipe(
      map((res) =>
        res.map((r, idx) => ({
          type: resourcesManaged[idx],
          total: r.total as number,
        }))
      )
    );
  }
}
