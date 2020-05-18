import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {

  CompanyName: string;
  CurrentDateandTime = new Date();
  livestreamBaseUrl = 'ws://35.188.41.41:8000/live/';
  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
    this.CompanyName = localStorage.getItem('plant');
    this.livestreamBaseUrl = this.livestreamBaseUrl + this.CompanyName + '.flv';
    console.log(this.livestreamBaseUrl);
  }
}
