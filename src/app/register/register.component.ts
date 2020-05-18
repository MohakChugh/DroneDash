import { Component, OnInit } from '@angular/core';
import * as axios from 'axios';

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
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    // If the password match
    if (this.password === this.repeatPassword) {
      axios.default.post('https://omnipresent-dashboard-backend.herokuapp.com/register', {
        email: this.email,
        password: this.password,
        name: this.name
      })
        .then(response => {
          // If the user was created successfully
          if (response.data.error === false && response.data.success === true) {
            alert('User Created Successfully!');
          } else {
            // If the user was not created successfully
            alert('The User was not created successfully!');
            console.log(response.data);
          }
        })
        .catch(err => {
          // If error occured while making a request
          alert('An Error occured while creating a user');
          console.log(err);
        });
    } else {
      // If the passwords did not match
      alert('Password Mismatch! Please Try Again!');
    }
  }
}
