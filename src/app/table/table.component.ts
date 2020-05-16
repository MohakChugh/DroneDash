import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  PLANTNAME = 'Hindalco';
  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
  }

}
