import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: any;
  dashboardLink: string;
  liveStreamLink: string;
  report: string;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.checkIfAdmin();
  }

  checkIfAdmin() {
    this.isAdmin = this.dataStore.getDataStore('isAdmin');

    if (this.isAdmin) {
      this.dashboardLink = '/admindashboard';
      this.liveStreamLink = '/adminlivestream';
      this.report = '/adminReport';
    } else {
      this.dashboardLink = '/plantmainpage';
      this.liveStreamLink = '/plantlivestream';
      this.report = '/reports';
    }
  }

}
