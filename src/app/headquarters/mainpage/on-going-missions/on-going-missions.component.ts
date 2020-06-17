import { Component, OnInit } from '@angular/core';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-on-going-missions',
  templateUrl: './on-going-missions.component.html',
  styleUrls: ['./on-going-missions.component.css']
})
export class OnGoingMissionsComponent implements OnInit {

  res: any;
  missions = [];
  constructor(private dataStore: DataStoreService) { }

  async ngOnInit() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      missionStatus {
        id
        plant
        status
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.missions = this.res.missionStatus;
      })
      .catch(err => console.log(err));

  }

}
