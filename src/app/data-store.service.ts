import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  // tslint:disable-next-line: variable-name
  private _dataStore = new BehaviorSubject<any>({});
  constructor() { }
  public getDataStore(key: any) {
    return this._dataStore[key];
  }
  public setDataStore(key: any, value: any) {
    this._dataStore[key] = value;
  }
  public deleteDataStore(key: any) {
    delete this._dataStore[key];
  }
}
