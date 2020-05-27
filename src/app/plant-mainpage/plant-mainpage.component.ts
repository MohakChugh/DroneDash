import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-plant-mainpage',
  templateUrl: './plant-mainpage.component.html',
  styleUrls: ['./plant-mainpage.component.css']
})
export class PlantMainpageComponent implements OnInit {

  plantname: string;
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.plantname = this.dataStore.getDataStore('plant');
  }

}
