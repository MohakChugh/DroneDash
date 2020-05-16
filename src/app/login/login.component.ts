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
    axios.default.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    })
      .then(response => {
        this.loading = false;
        console.log(response.data);
        if (response.data.error === false && !!response.data.token === true) {
          // Checking if the user is Admin
          if (this.email !== 'admin@admin.com') {
            localStorage.setItem('isAuth', 'true');
            this.router.navigateByUrl('plantmainpage');
          } else {
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('isAdmin', 'true');
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
