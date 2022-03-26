import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

// any va sostituito con interfaccia che abbia le minime parti in comune
// per tutte le risorse
export const CmpGenericInj = new InjectionToken<any>('cmpGenericInj');

// Ricopio anche una classe dalla shell in caso servisse
// Per i test di CRUD sui component dinamici

export class CmpInjectorModel {
  content: any;
  actions$: Subject<string>;
  callBack$: Subject<string>;
  infos$: Subject<any>;
}
