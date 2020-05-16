import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
  }

}
