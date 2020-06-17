import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
  }

}
