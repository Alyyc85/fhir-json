import { Type } from '@angular/core';
import { MetaComponent, PrimitiveComponent } from './dynamic-instance';

export interface Signature {
  /**
   * Il nome della proprietà della risorsa
   *
   * @type {string}
   * @memberof Signature
   */
  displayProp?: string;
  /**
   * Il riferimento allo schema Fhir
   *
   * @type {string}
   * @memberof Signature
   */
  definition: string;
  /**
   * Il componente di rendering
   *
   * @type {Type<any>}
   * @memberof Signature
   */
  instance: Type<any>;
  /**
   * Informazioni aggiuntive
   * in prova
   *
   * @type {*}
   * @memberof Signature
   */
  options?: any;
  content?: any;
}

export const signatureType: Signature[] = [
  { definition: 'meta', instance: MetaComponent },
  { definition: 'id', instance: PrimitiveComponent },
  { definition: 'instant', instance: PrimitiveComponent },
];
