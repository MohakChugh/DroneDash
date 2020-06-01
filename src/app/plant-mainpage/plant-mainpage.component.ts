import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { DataStoreService } from '../data-store.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-plant-mainpage',
  templateUrl: './plant-mainpage.component.html',
  styleUrls: ['./plant-mainpage.component.css']
})
export class PlantMainpageComponent implements OnInit {

  plantname: string;
  task: string;
  taskAdded = false;
  res: any;
  todoList = [];
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    this.plantname = this.dataStore.getDataStore('plant');
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      todoList(where: {plant: {_eq: "${this.plantname}"}}) {
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

  async addTask() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = `mutation MyMutation {
      insert_todoList(objects: {plant: "${this.plantname}", text: "${this.task}"}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => {
        this.taskAdded = true;
        setTimeout(() => {
          this.taskAdded = false;
        }, 2000);
      })
      .catch(err => console.log(err));

    query = `query MyQuery {
      todoList(where: {plant: {_eq: "${this.plantname}"}}) {
        id
        plant
        text
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.todoList = this.res.todoList;
      })
      .catch(err => console.log(err));
  }

  async deleteTask(id: any) {
    console.log(id);
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = `mutation MyMutation {
      delete_todoList(where: {id: {_eq: "${id}"}}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));

    query = `query MyQuery {
      todoList(where: {plant: {_eq: "${this.plantname}"}}) {
        id
        plant
        text
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
