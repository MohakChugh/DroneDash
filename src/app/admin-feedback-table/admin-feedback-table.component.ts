import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-admin-feedback-table',
  templateUrl: './admin-feedback-table.component.html',
  styleUrls: ['./admin-feedback-table.component.css']
})
export class AdminFeedbackTableComponent implements OnInit {

  messages = [];
  res: any;
  constructor(private dataStore: DataStoreService, public logout: LogoutService) { }

  async ngOnInit() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      message {
        by
        id
        message
        plant
        timestamp
      }
    }
    `;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.messages = this.res.message;
      })
      .catch(err => console.log(err));
  }

}
