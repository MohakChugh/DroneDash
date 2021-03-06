import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: any;
  isMainBranch: any;
  isPilot: any;
  dashboardLink: string;
  liveStreamLink: string;
  report: string;
  scheduleLink: string;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.checkIfAdmin();
  }

  checkIfAdmin() {
    this.isAdmin = this.dataStore.getDataStore('isAdmin');
    this.isMainBranch = this.dataStore.getDataStore('isMainBranch');
    this.isPilot = this.dataStore.getDataStore('isPilot');
    if (this.isAdmin) {
      this.dashboardLink = '/admindashboard';
      this.liveStreamLink = '/adminlivestream';
      this.report = '/adminReport';
      this.scheduleLink = '/Adminschedule';
    } else if (this.isMainBranch) {
      this.dashboardLink = '/dashboard';
      this.liveStreamLink = '/livestream';
      this.report = '/mainBranchReports';
      this.scheduleLink = '/plantschedule';
    } else if (this.isPilot) {
      this.dashboardLink = '/pilotmainpage';
      this.report = '/reports';
      this.scheduleLink = '/pilotSchedule';
    } else {
      this.dashboardLink = '/plantmainpage';
      this.liveStreamLink = '/plantlivestream';
      this.report = '/reports';
      this.scheduleLink = '/plantschedule';
    }
  }

  deleteSelectedPlant() {
    this.dataStore.deleteDataStore('plantChosen');
  }
}
