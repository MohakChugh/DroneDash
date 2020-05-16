import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-admin-livestream',
  templateUrl: './admin-livestream.component.html',
  styleUrls: ['./admin-livestream.component.css']
})
export class AdminLivestreamComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  company_name = 'Hindalco';
  Time = new Date();
  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
  }


}
