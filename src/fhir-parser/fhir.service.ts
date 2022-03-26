import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _jpath from 'jsonpath';
import { defConst } from '../commons/consts';
import { Signature, signatureType } from './signatures';

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

  resolveResource(resource: any, definition: string): Signature[] {
    // non ricavo più il type dalla risorsa perchè uso la funzione ricorsivamente
    // quindi devo inviarmi il resourceType - definition ogni volta
    const schema = this.schema.definitions[definition];
    const resourceEntries = Object.entries(resource);

    let elaborateResource: any[] = [];

    resourceEntries.map((prop) => {
      // Lo uso un attimo per capire quali metodi del parse mi vengono
      // più utili
      const checkSchema = {
        query: jPath.query(schema, `$..${prop[0]}`), // array -> come value
        node: jPath.nodes(schema, `$..${prop[0]}`), // troppo
        value: jPath.value(schema, `$..${prop[0]}`), // oggetto -> uso questo
        path: jPath.paths(schema, `$..${prop[0]}`), // test forse non serve
      };
      // console.log(checkSchema);
      elaborateResource = [
        ...elaborateResource,
        {
          schemaValue: jPath.value(schema, `$..${prop[0]}`),
          displayProp: prop[0],
          itemResourceValue: prop[1],
        },
      ];
    });

    const infoMe = (obj: any, type: string) =>
      console.info('[Fhir service schemaCheck]', '\n', type, obj);

    const mapped = elaborateResource.map((res) => {
      if (res.schemaValue?.hasOwnProperty('$ref')) {
        // A $ref deve corrispondere ciascun elemento atomico finale
        // il "data type" da mostrare con le proprie regole
        const minimizedDef = res.schemaValue.$ref.replace(defConst, '');
        const refRet = this.formatRef(
          minimizedDef,
          res.itemResourceValue,
          res.displayProp
        );
        infoMe(res.schemaValue.$ref, '$ref');
        return refRet;
      } else if (res.schemaValue?.hasOwnProperty('const')) {
        // Const è l'elemento radice della risorsa,
        // dovrebbe corrispondere al resourceType caricato,
        // al momento si può ignorare
        infoMe(res.schemaValue.const, 'const');
        return null;
      } else if (res.schemaValue?.hasOwnProperty('type')) {
        // Il type è array, avranno un $ref unico per ciascun elemento
        // vedo di ricavare il value richiamando la funzione
        // solo che deve produrre un array
        infoMe(res.schemaValue.type, 'type');
        return null;
      } else {
        return null;
      }
    });

    console.info('[Fhir service resolved signature]', '\n', mapped);

    return mapped;
  }

  private formatRef(
    minimizedDef: string,
    itemResourceValue: any,
    displayProp: string
  ): Signature {
    // Invocata ricorsivamente
    // interroga il tipo di valore inviato, NON le definition
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
        return this.resolveResource(value, minimizedDef);
      }
    };
    return {
      definition: minimizedDef,
      instance: signatureType.find((s) => s.definition === minimizedDef)
        ?.instance,
      displayProp,
      content: getContent(itemResourceValue),
      options: { definition: minimizedDef, displayProp },
    };
  }
}
