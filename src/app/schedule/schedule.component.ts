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
  remark: string;
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
          id
          date
          plant
          window
          remark
          type
        }
      }`;
    }
    else {
      query = `query MyQuery {
        schedules(order_by: {date: desc}, where: {plant: {_eq: "${this.plantname}"}}) {
          id
          date
          plant
          window
          remark
          type
        }
      }`;
    }
    await client.request(query)
      .then(data => {
        this.res = data;
        this.schedules = this.res.schedules;
        console.log(this.schedules);
      })
      .catch(err => console.log(err));
  }

  async addRemark(id: number) {
    console.log(this.remark);
    console.log(id);
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = `mutation MyMutation {
      update_schedules(where: {id: {_eq: "${id}"}}, _set: {remark: "${this.remark}"}) {
        affected_rows
      }
    }
    `;
    await client.request(query)
      .then(data => {
      })
      .catch(err => console.log(err));

    query = ``;
    if (this.isAdmin || this.isMainBranch) {
      query = `query MyQuery {
          schedules(order_by: {date: desc}) {
            id
            date
            plant
            window
            remark
            type
          }
        }`;
    }
    else {
      query = `query MyQuery {
          schedules(order_by: {date: desc}, where: {plant: {_eq: "${this.plantname}"}}) {
            id
            date
            plant
            window
            remark
            type
          }
        }`;
    }
    await client.request(query)
      .then(data => {
        this.res = data;
        this.schedules = this.res.schedules;
        console.log(this.schedules);
      })
      .catch(err => console.log(err));
  }
}
