import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthGuard implements CanActivate {

  constructor(private datastore: DataStoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.datastore.getDataStore('isAuth');
    if (isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}
