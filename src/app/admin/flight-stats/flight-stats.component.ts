import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-flight-stats',
  templateUrl: './flight-stats.component.html',
  styleUrls: ['./flight-stats.component.css']
})
export class FlightStatsComponent implements OnInit {

  pilotStats = [];
  any: any;
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      pilotStats(order_by: {timestamp: desc}) {
        day_night
        id
        plant
        operation
        timestamp
        start_stop
      }
    }`;
    await client.request(query)
      .then(data => {
        console.log(data);
        this.any = data;
        this.pilotStats = this.any.pilotStats;
      })
      .catch(err => console.log(err));
  }

}
