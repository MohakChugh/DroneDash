import { Component, OnInit } from '@angular/core';
import * as axios from 'axios';
import { Router } from '@angular/router';
import { DataStoreService } from '../data-store.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loading = false;
  incorrect = false;
  response: any;
  constructor(private router: Router, private dataStore: DataStoreService) { }

  ngOnInit(): void {
  }

  async newLogin() {
    this.loading = true;
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      user(where: {email: {_eq: "${this.email}"}}) {
        email
        name
        password
        plant
        role
      }
    }`;
    const result = await client.request(query)
      .then(data => data)
      .catch((err) => err);
    this.response = result;
    console.log(this.response);
    if (this.response.user.length === 1 && this.response.user[0].password === this.password) {
      this.loading = false;
      // Set Authenticated = true
      this.dataStore.setDataStore('isAuth', true);

      // If user is Omnipresent Admin
      if (this.response.user[0].role === 'admin') {
        this.dataStore.setDataStore('isAdmin', true);
        console.log('USER IS ADMIN');

        // Route the admin to admin dashboard
        this.router.navigateByUrl('admindashboard');
      }
      // If user is MainBranch Admin
      else if (this.response.user[0].role === 'semiadmin') {
        this.dataStore.setDataStore('isMainBranch', true);
        console.log('USER IS HEADQUARTERS ADMIN');
        // Route the admin to admin dashboard
        this.router.navigateByUrl('dashboard');
      }
      // If user is Pilot
      else if (this.response.user[0].role === 'pilot') {
        this.dataStore.setDataStore('isPilot', true);
        console.log('USER IS PILOT');
        // fetch the plant name
        const plant = this.response.user[0].plant;
        this.dataStore.setDataStore('plant', plant);
        this.router.navigateByUrl('pilotmainpage');
      }
      // If user is Plant
      else if (this.response.user[0].role === 'plant') {
        // fetch the plant name
        const plant = this.response.user[0].plant;
        this.dataStore.setDataStore('plant', plant);
        console.log('USER IS PLANT');

        // Route the user to plant dashboard
        this.router.navigateByUrl('plantmainpage');
      }
    } else {
      this.loading = true;
      this.incorrect = true;
      setTimeout(() => {
        this.incorrect = false;
      }, 5000);
    }
    this.loading = false;
  }
}
