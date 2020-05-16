import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-livestream',
  templateUrl: './admin-livestream.component.html',
  styleUrls: ['./admin-livestream.component.css']
})
export class AdminLivestreamComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  company_name = 'Hindalco';
  Time = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
