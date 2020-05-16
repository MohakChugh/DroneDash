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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    axios.default.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    })
      .then(response => {
        console.log(response.data);
        if (response.data.error === false) {
          if (this.email !== 'admin@admin.com') {
            this.router.navigateByUrl('plantmainpage');
          } else {
            localStorage.setItem('isAdmin', 'true');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
