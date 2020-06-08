import { Component, OnInit } from '@angular/core';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  plantName: any = 'SELECT';
  password: string;
  confirmPassword: string;
  plants = [];
  res: any;
  constructor() { }

  async ngOnInit() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      user {
        email
        id
        name
        password
        plant
        role
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.plants = this.res.user;
      })
      .catch((err) => err);
  }

  selectPlant(plantname) {
    this.plantName = plantname;
  }
  async reset() {
    if (this.password !== this.confirmPassword) {
      alert('The password and the confirmation did not match! Please try again!');
    }
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `mutation MyMutation {
      update_user(where: {email: {_eq: "${this.plantName}"}}, _set: {password: "${this.password}"}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => {
        alert('Password Updated!');
      })
      .catch((err) => err);
  }

}
