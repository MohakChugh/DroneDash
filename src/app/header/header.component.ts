import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: any;
  dashboardLink: string;
  liveStreamLink: string;
  constructor() { }

  ngOnInit(): void {
    this.checkIfAdmin();
  }

  checkIfAdmin() {
    this.isAdmin = localStorage.getItem('isAdmin');
    if (this.isAdmin) {
      this.dashboardLink = '/admindashboard';
      this.liveStreamLink = '/adminlivestream';
    } else {
      this.dashboardLink = '/plantmainpage';
      this.liveStreamLink = '/plantlivestream';
    }
  }

}
