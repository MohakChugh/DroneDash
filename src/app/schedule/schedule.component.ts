import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  plantname: any;
  isAdmin: any;
  isMainBranch: any;
  isPlant: any;
  isPilot: any;
  res: any;
  schedules = [];
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    this.isAdmin = this.dataStore.getDataStore('isAdmin');
    this.isMainBranch = this.dataStore.getDataStore('isMainBranch');
    this.isPilot = this.dataStore.getDataStore('isPilot');
    this.isPlant = this.dataStore.getDataStore('isMainBranch');
    if (!this.isAdmin || !this.isMainBranch) { this.plantname = this.dataStore.getDataStore('plant'); }

    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = ``;
    if (this.isAdmin || this.isMainBranch) {
      query = `query MyQuery {
        schedules(order_by: {date: desc}) {
          date
          plant
          window
        }
      }`;
    }
    else {
      query = `query MyQuery {
        schedules(order_by: {date: desc}, where: {plant: {_eq: "${this.plantname}"}}) {
          date
          plant
          window
        }
      }`;
    }
    await client.request(query)
      .then(data => {
        this.res = data;
        this.schedules = this.res.schedules;
      })
      .catch(err => console.log(err));
  }
}
