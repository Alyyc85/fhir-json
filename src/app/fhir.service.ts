import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FhirService {
  schema: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/fhir.schema.json').subscribe((data) => {
      this.schema = data;
    });
  }

  getResource(url: string) {
    return this.httpClient.get(`http://hapi.fhir.org/baseR4/${url}`);
  }

  getView(resource: any) {
    const rt = resource.resourceType;
    const schema = this.schema.definitions[rt];
    const keys = Object.keys(resource);
    console.log(schema.properties, resource);
    return keys.map((prop) => {
      return {
        name: prop,
        resolver: this.resolver(schema.properties[prop], prop, resource),
      };
    });
  }

  private resolver(nodo: any, prop: string, resource: any): any {
    if (nodo.hasOwnProperty('const')) return resource[prop];
    if (nodo.hasOwnProperty('type')) {
      return (
        this.formatType(nodo, prop, resource) ?? JSON.stringify(nodo, null, 2)
      );
    }
    if (nodo.hasOwnProperty('$ref')) {
      const ref = nodo.$ref.replace('#/definitions/', '');
      return (
        this.formatRef(ref, resource[prop]) ??
        this.resolver(this.schema.definitions[ref], prop, resource)
      );
    }
    return JSON.stringify(nodo, null, 2);
  }

  private formatType(nodo: any, prop: string, resource: any): any {
    const value = resource[prop];
    let returned: any;
    console.log('formatType', nodo.type, value);
    var elements: any = { string: null, array: null };
    switch (nodo.type) {
      case 'string':
        returned = `${value} (string)`;
        break;
      case 'array':
        console.log(value, nodo);
        const subKeys = Object.keys(resource[prop]);

        const resolved = subKeys.map((s) => ({
          name: s,
          resolver: this.resolver(nodo.items, s, resource[prop]),
        }));
        returned = `${resolved} (array)`;
        break;
    }
    return elements[nodo.type];
  }

  private formatRef(ref: string, value: any): string {
    var elements: any = {
      date: `${value} (date)`,
      code: `${value} (code)`,
    };
    return elements[ref];
  }
}
