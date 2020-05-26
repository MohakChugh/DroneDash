import { Component, OnInit, ErrorHandler } from '@angular/core';
import { LogoutService } from '../logout.service';
import * as flvjs from 'flv.js';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {

  CompanyName: string;
  CurrentDateandTime = new Date();
  liveStreamUrl = 'ws://35.222.157.43:8000/live/';
  liveStreamOn = false;
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.CompanyName = this.dataStore.getDataStore('plant');

    this.CompanyName = this.CompanyName.toLowerCase();
    this.liveStreamUrl = this.liveStreamUrl + this.CompanyName + '.flv';
    console.log(this.liveStreamUrl);
  }

  async player() {
    this.liveStreamOn = true;
    if (flvjs.default.isSupported()) {
      const videoElement = document.getElementById('videoElement') as HTMLMediaElement;
      const flvPlayer = flvjs.default.createPlayer({
        type: 'flv',
        url: this.liveStreamUrl
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      try {
        await flvPlayer.play();
      } catch (err) {
        console.log(err);
        alert('Error Occured! Stream is not working!');
      }
    }
  }
}
