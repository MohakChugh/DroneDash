import { Component, OnInit } from '@angular/core';
import * as axios from 'axios';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    axios.default.post('https://omnipresent-dashboard-backend.herokuapp.com/login', {
      email: this.email,
      password: this.password
    })
      .then(response => {
        this.loading = false;
        console.log(response.data);
        if (response.data.error === false && !!response.data.token === true) {
          // Checking if the user is Admin
          if (this.email !== 'admin@admin.com') {
            // If the user is not admin
            localStorage.setItem('isAuth', 'true');

            // Save the name of the plant in the local storage
            localStorage.setItem('plant', this.email);

            // Route the user to plant dashboard
            this.router.navigateByUrl('plantmainpage');
          } else {
            // If the user is Admin
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('isAdmin', 'true');

            // Route the admin to admin dashboard
            this.router.navigateByUrl('admindashboard');
          }
        } else {
          this.incorrect = true;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
