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
      message(order_by: {timestamp: desc}) {
        by
        id
        plant
        message
        timestamp
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.messages = this.res.message;
      })
      .catch(err => console.log(err));
  }

  async deleteMessage(id) {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = `mutation MyMutation {
      delete_message(where: {id: {_eq: "${id}"}}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.messages = this.res.message;
      })
      .catch(err => console.log(err));

    query = `query MyQuery {
      message(order_by: {timestamp: desc}) {
        by
        id
        plant
        message
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
