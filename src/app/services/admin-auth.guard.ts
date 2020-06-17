import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private dataStore: DataStoreService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.dataStore.getDataStore('isAuth');
    const isAdmin = this.dataStore.getDataStore('isAdmin');
    if (!!isAdmin && !!isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }

}
