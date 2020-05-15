import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {

  CompanyName = 'Hindalco';
  CurrentDateandTime = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
