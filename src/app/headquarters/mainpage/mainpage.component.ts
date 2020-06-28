import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from '../../services/data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  todoList = [];
  plants = [];
  clickedPlant: string;
  res: any;
  adminName: string;
  admin: string;
  constructor(public logout: LogoutService, private dataStore: DataStoreService, private router: Router) { }

  async ngOnInit() {
    const isAdmin = this.dataStore.getDataStore('isAdmin');
    const isMainBranch = this.dataStore.getDataStore('isMainBranch');
    if (isAdmin) { this.adminName = 'Omnipresent Admin'; }
    if (isMainBranch) { this.adminName = 'Hindalco Headquarters'; }

    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
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

      user(where: {role: {_eq: "plant"}}) {
        name
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.todoList = this.res.todoList;
        this.plants = this.res.user;
      })
      .catch(err => console.log(err));

    if (isAdmin) { this.admin = isAdmin; }
  }

  plantChosen(plantName: string) {
    this.dataStore.setDataStore('plantChosen', plantName);
    const isAdmin = this.dataStore.getDataStore('isAdmin');
    const isMainBranch = this.dataStore.getDataStore('isMainBranch');

    if (isAdmin) { this.router.navigateByUrl('adminReport'); }
    if (isMainBranch) { this.router.navigateByUrl('mainBranchReports'); }
  }

}
