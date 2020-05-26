import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreService } from './data-store.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router, private dataStore: DataStoreService) { }
  logout() {
    this.dataStore.deleteDataStore('isAdmin');
    this.dataStore.deleteDataStore('isAuth');
    this.router.navigateByUrl('login');
  }
}
