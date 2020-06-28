import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { DataStoreService } from '../../services/data-store.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  plantname: string;
  isPlant: any;
  isPilot: any;
  role: any;
  isMainBranch: any;
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    this.plantname = this.dataStore.getDataStore('plant');
    this.isPilot = this.dataStore.getDataStore('isPilot');
    this.isPlant = this.dataStore.getDataStore('isAuth');
    this.isMainBranch = this.dataStore.getDataStore('isMainBranch');
    if (this.isPilot) {
      this.role = 'pilot';
    } else if (this.isPlant) {
      this.role = 'plant';
    }
  }

  async reset() {
    if (this.password !== this.confirmPassword) { alert(`The password and it's confirmation does not match! Please Try Again!`); }
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    let query = ``;
    if (this.isMainBranch) {
      query = `mutation MyMutation {
        update_user(where: {role: {_eq: "semiadmin"}, plant: {_eq: "admin"}, email: {_eq: "main"}}, _set: {password: "${this.password}"}) {
          affected_rows
        }
      }`;
    }
    else {
      query = `mutation MyMutation {
        update_user(where: {role: {_eq: "${this.role}"}, plant: {_eq: "${this.plantname}"}}, _set: {password: "${this.password}"}) {
          affected_rows
        }
      }`;
    }

    await client.request(query)
      .then(data => {
        alert('Password Updated!');
      })
      .catch((err) => err);
  }
}
