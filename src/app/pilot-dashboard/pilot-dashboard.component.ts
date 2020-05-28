import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-pilot-dashboard',
  templateUrl: './pilot-dashboard.component.html',
  styleUrls: ['./pilot-dashboard.component.css']
})
export class PilotDashboardComponent implements OnInit {

  pilotName = '';
  isSent = false;
  constructor(private dataStore: DataStoreService, public logout: LogoutService) { }

  ngOnInit(): void {
    this.pilotName = this.dataStore.getDataStore('plant');
  }

}
