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
    this.dataStore.deleteDataStore('isAuth');
    this.dataStore.deleteDataStore('isAdmin');
    this.dataStore.deleteDataStore('isPilot');
    this.dataStore.deleteDataStore('isMainBranch');
    this.dataStore.deleteDataStore('plantChosen');
    this.dataStore.deleteDataStore('plant');
    this.dataStore.deleteDataStore('isPlant');
    this.router.navigateByUrl('login');
  }
}
