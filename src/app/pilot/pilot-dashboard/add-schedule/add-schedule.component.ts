import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  date: Date;
  win: string;
  plant: any;
  res: any;
  type = 'Type';
  schedules = [];
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    this.plant = this.dataStore.getDataStore('plant');
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      schedules(order_by: {date: desc}, where: {plant: {_eq: "${this.plant}"}}) {
        id
        date
        plant
        window
        type
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.schedules = this.res.schedules;
      })
      .catch(err => console.log(err));
  }

  async insertSchedule() {

    if (this.type === 'Type') { alert('Please Select Type for the schedule'); }
    else {

      const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'omnipresent'
        },
      });
      let query = `mutation MyMutation {
        insert_schedules(objects: {date: "${this.date}", plant: "${this.plant}", window: "${this.win}", type: "${this.type}"}) {
          affected_rows
        }
      }`;
      await client.request(query)
        .then(data => {
          alert('Schedule Added');
        })
        .catch(err => console.log(err));

      query = `query MyQuery {
          schedules(order_by: {date: desc}, where: {plant: {_eq: "${this.plant}"}}) {
            id
            date
            plant
            window
            type
          }
        }`;
      await client.request(query)
        .then(data => {
          this.res = data;
          this.schedules = this.res.schedules;
        })
        .catch(err => console.log(err));
    }
  }

  async deleteSchedule(id: any) {
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = `mutation MyMutation {
      delete_schedules(where: {id: {_eq: "${id}"}}) {
        affected_rows
      }
    }
    `;
    await client.request(query)
      .then(data => {
      });
    query = `query MyQuery {
      schedules(order_by: {date: desc}, where: {plant: {_eq: "${this.plant}"}}) {
        id
        date
        plant
        window
        type
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.schedules = this.res.schedules;
      })
      .catch(err => console.log(err));
  }

  typeset(type: string) {
    this.type = type;
    console.log(this.type);
  }
}
