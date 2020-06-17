import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class PilotGuard implements CanActivate {
  constructor(private dataStore: DataStoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated: boolean = this.dataStore.getDataStore('isAuth');
    const isPilot: boolean = this.dataStore.getDataStore('isPilot');
    if (isAuthenticated && isPilot) {
      return true;
    } else {
      return false;
    }
  }

}
