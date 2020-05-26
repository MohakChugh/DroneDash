import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class MainbranchGuard implements CanActivate {
  constructor(private dataStore: DataStoreService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.dataStore.getDataStore('isAuth');
    const isMainBranch = this.dataStore.getDataStore('isMainBranch');
    if (!!isAuthenticated && !!isMainBranch) {
      return true;
    } else {
      return false;
    }
  }
}
