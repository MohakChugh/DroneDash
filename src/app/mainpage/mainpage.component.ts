import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  todoList = [];
  res: any;
  constructor(public logout: LogoutService) { }

  async ngOnInit() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      todoList {
        id
        plant
        text
      }
    }`;
    await client.request(query)
      .then(data => {
        console.log(data);
        this.res = data;
        this.todoList = this.res.todoList;
      })
      .catch(err => console.log(err));
  }


}
