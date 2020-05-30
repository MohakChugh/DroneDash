import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-pilot-dashboard',
  templateUrl: './pilot-dashboard.component.html',
  styleUrls: ['./pilot-dashboard.component.css']
})
export class PilotDashboardComponent implements OnInit {

  pilotName = '';
  isSent = false;
  res: any;
  todoList = [];
  constructor(private dataStore: DataStoreService, public logout: LogoutService) { }

  async ngOnInit() {
    this.pilotName = this.dataStore.getDataStore('plant');
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      todoList(where: {plant: {_eq: "${this.pilotName}"}}) {
        plant
        text
        id
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.todoList = this.res.todoList;
      })
      .catch(err => console.log(err));
  }

}
