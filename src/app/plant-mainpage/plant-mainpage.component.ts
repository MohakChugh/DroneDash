import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-plant-mainpage',
  templateUrl: './plant-mainpage.component.html',
  styleUrls: ['./plant-mainpage.component.css']
})
export class PlantMainpageComponent implements OnInit {

  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
  }

}
