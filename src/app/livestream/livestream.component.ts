import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {

  CompanyName = 'Hindalco';
  CurrentDateandTime = new Date();
  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
  }

}
