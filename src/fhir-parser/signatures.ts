import { Type } from '@angular/core';
import { dynamicCmpsObj } from './dynamic-instance';

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
  { definition: 'Meta', instance: dynamicCmpsObj.MetaComponent },
  { definition: 'id', instance: dynamicCmpsObj.PrimitiveComponent },
  { definition: 'string', instance: dynamicCmpsObj.PrimitiveComponent },
  { definition: 'boolean', instance: dynamicCmpsObj.PrimitiveComponent },
  { definition: 'instant', instance: dynamicCmpsObj.DateComponent },
  { definition: 'date', instance: dynamicCmpsObj.DateComponent },
  { definition: 'xhtml', instance: dynamicCmpsObj.XhtmlComponent },
  { definition: 'Narrative', instance: dynamicCmpsObj.NarrativeComponent },
  { definition: 'code', instance: dynamicCmpsObj.CodeComponent },
  { definition: 'Reference', instance: dynamicCmpsObj.ReferenceComponent },
];
