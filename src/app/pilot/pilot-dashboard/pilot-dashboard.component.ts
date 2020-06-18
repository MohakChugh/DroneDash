import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';
import { LogoutService } from '../../services/logout.service';
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
  start: string;
  startStatus: string;
  enable: boolean;
  /** If mission status is start => means mission is currently not started yet, i.e. mission is currently stopped */
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

      missionStatus(where: {plant: {_eq: "${this.pilotName}"}}) {
        plant
        status
        id
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.todoList = this.res.todoList;
        this.start = this.res.missionStatus[0].status;
        if (this.start === 'stop') { this.startStatus = 'Drone Currently Not Flying!'; }
        else if (this.start === 'start') { this.startStatus = 'Drone Currently Flying!'; }
      })
      .catch(err => console.log(err));
  }

  async toggleTaskStatus() {
    if (this.start === 'stop') { this.start = 'start'; this.startStatus = 'Drone Currently Flying!'; }
    else if (this.start === 'start') { this.start = 'stop'; this.startStatus = 'Drone Currently Not Flying!'; }

    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `mutation MyMutation {
      update_missionStatus(where: {plant: {_eq: "${this.pilotName}"}}, _set: {status: "${this.start}"}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => { })
      .catch(err => console.log(err));
  }
}
