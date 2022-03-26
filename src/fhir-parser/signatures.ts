import { Type } from '@angular/core';
import {
  DateComponent,
  MetaComponent,
  NarrativeComponent,
  PrimitiveComponent,
  XhtmlComponent,
} from './dynamic-instance';
import { CodeComponent } from './dynamic-instance/code.component';

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
  { definition: 'Meta', instance: MetaComponent },
  { definition: 'id', instance: PrimitiveComponent },
  { definition: 'string', instance: PrimitiveComponent },
  { definition: 'boolean', instance: PrimitiveComponent },
  { definition: 'instant', instance: DateComponent },
  { definition: 'date', instance: DateComponent },
  { definition: 'xhtml', instance: XhtmlComponent },
  { definition: 'Narrative', instance: NarrativeComponent },
  { definition: 'code', instance: CodeComponent },
];
