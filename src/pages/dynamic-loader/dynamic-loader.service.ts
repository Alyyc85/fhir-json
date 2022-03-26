import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UrlVisited {
  source: 'list' | 'detail';
  type: string;
  id?: string;
}

@Injectable()
export class DynamicLoaderService {
  private urlVisited$ = new BehaviorSubject<UrlVisited[]>([]);
  constructor() {
    const f5 = localStorage.getItem('urlVisited');
    console.log(f5);
    if (f5) {
      this.urlVisited$.next(JSON.parse(f5));
    }
  }

  pushVisit(content: UrlVisited) {
    const value = this.urlVisited$.value;
    const check = value.find(
      (url) => JSON.stringify(content) === JSON.stringify(url)
    );
    if (check) {
      // è un ritorno
      console.log('da gestire');
    } else {
      value.push(content);
      this.urlVisited$.next(value);
    }
    this.storeUrl();
  }

  removeOthers(content: UrlVisited) {
    const value = this.urlVisited$.value;

    const idxInArray = value.findIndex(
      (url) => JSON.stringify(content) === JSON.stringify(url)
    );
    if (idxInArray != null && idxInArray < value.length - 1) {
      const partial = [...value].slice(0, idxInArray + 1);
      this.urlVisited$.next(partial);
    }
    this.storeUrl();
  }

  getUrl$() {
    return this.urlVisited$.asObservable();
  }

  reset() {
    this.urlVisited$.next([]);
    localStorage.clear();
  }

  private storeUrl() {
    localStorage.setItem('urlVisited', JSON.stringify(this.urlVisited$.value));
  }
}
