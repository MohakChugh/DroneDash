import { Component, OnInit } from '@angular/core';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  plantname: string;
  role: string;
  constructor() { }

  ngOnInit(): void {
  }

  async register() {
    if (this.password !== this.repeatPassword) { alert('The Password and its Confirmation did not match! Please try again!'); }
    else {
      const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'omnipresent'
        },
      });

      this.email = this.email.toLowerCase();
      this.name = this.name.toLowerCase();
      this.plantname = this.plantname.toLowerCase();
      this.role = this.role.toLowerCase();

      const query = `mutation MyMutation {
      insert_user(objects: {
        email: "${this.email}",
        name: "${this.name}",
        password: "${this.password}",
        plant: "${this.plantname}",
        role: "${this.role}"
      }) {
        affected_rows
      }
    }
    `;
      await client.request(query)
        .then(data => { alert('User added successfully'); })
        .catch((err) => err);

      if (this.role === 'pilot') {
        const query = `mutation MyMutation {
          insert_missionStatus(objects: {plant: "${this.plantname}", status: "stop"}) {
            affected_rows
          }
        }`;
        await client.request(query)
          .then(data => { })
          .catch((err) => err);

      }
    }
  }
}
