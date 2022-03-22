import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _jpath from 'jsonpath';

const jPath = _jpath;

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
    // return this.httpClient.get(`http://hapi.fhir.org/baseR4/${url}`);
    return this.httpClient.get(`http://test.fhir.org/r4//${url}`);
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

  testSplit(resource: any, schemaInput?: any): any {
    const rT = resource.resourceType;
    const schema = schemaInput
      ? this.schema.definitions[schemaInput]
      : this.schema.definitions[rT];
    const keys = Object.entries(resource);
    let tst: any[] = [];
    keys.map((k) => {
      tst = [
        ...tst,
        {
          definitions: jPath.query(schema, `$..${k[0]}`),
          value: k[1],
          displayProp: k[0],
        },
      ];
    });
    console.log(tst, 'tst');

    const mapped = (res: any[]) => {
      return res.map((r) => {
        if (r.definitions[0].hasOwnProperty('$ref')) {
          const propRef = r.definitions[0].$ref.replace('#/definitions/', '');
          const formatted = this.format(propRef, r.value, r.displayProp);
          console.log(formatted, 'formatted');
          return formatted;
        }
        return null;
      });
    };
    const toRet = mapped(tst);
    console.log(toRet);
    return toRet;
  }

  private format(propRef: string, value: any, displayProp: string) {
    const getContent = (value: any): any => {
      if (
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'number'
      ) {
        return value;
      } else if (Array.isArray(value)) {
        return value.map((v) => getContent(v));
      } else {
        console.log(value, propRef, 'value-propRef');
        const prova = this.testSplit(value, propRef);
        return prova;
      }
    };
    return {
      signature: propRef.toLowerCase(),
      content: getContent(value),
      prop: displayProp,
    };
  }
}
