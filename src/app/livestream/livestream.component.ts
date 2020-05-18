import { Component, OnInit, ErrorHandler } from '@angular/core';
import { LogoutService } from '../logout.service';
import * as flvjs from 'flv.js';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {

  CompanyName: string;
  CurrentDateandTime = new Date();
  liveStreamUrl = 'ws://35.188.41.41:8000/live/';
  liveStreamOn = false;
  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
    this.CompanyName = localStorage.getItem('plant');
    this.CompanyName = this.CompanyName.toLowerCase();
    this.liveStreamUrl = this.liveStreamUrl + this.CompanyName + '.flv';
    console.log(this.liveStreamUrl);
  }

  player() {
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
        flvPlayer.play();
        // .catch(err => alert('Error Occured'));
      } catch (err) {
        console.log(err);
        alert('Error Occured! Stream is not working!');
      }
    }
  }
}
