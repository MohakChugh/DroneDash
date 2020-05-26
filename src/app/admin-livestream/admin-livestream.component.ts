import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import * as axios from 'axios';
import * as flvjs from 'flv.js';

@Component({
  selector: 'app-admin-livestream',
  templateUrl: './admin-livestream.component.html',
  styleUrls: ['./admin-livestream.component.css']
})
export class AdminLivestreamComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  company_name = 'Hindalco';
  Time = new Date();
  names = [];
  liveStreamBaseUrl = 'ws://35.222.157.43:8000/live/';
  urls = [];
  liveStreamOn = false;
  liveStreamUrl: string;
  constructor(public logout: LogoutService) { }

  ngOnInit(): void {
    axios.default.get('https://omnipresent-dashboard-backend.herokuapp.com/getNames')
      .then(response => {
        if (response.data.error === false) {
          this.names = response.data.response;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.names.length; i++) {
            this.urls.push(`${this.liveStreamBaseUrl}${this.names[i]}`);
          }
        }
      })
      .catch(err => {
        console.log(err);
        alert('An Error Occured while getting the livestreams! Please check the Console for details');
      });
  }

  async player(index) {
    this.liveStreamUrl = this.urls[index];
    setTimeout(() => {
      this.liveStreamOn = true;
    }, 2000);
    if (flvjs.default.isSupported()) {
      const element = 'videoElement' + index;
      const videoElement = document.getElementById(element) as HTMLMediaElement;
      const flvPlayer = await flvjs.default.createPlayer({
        type: 'flv',
        url: this.liveStreamUrl
      });
      await flvPlayer.attachMediaElement(videoElement);
      await flvPlayer.load();
      try {
        await flvPlayer.play();
      } catch (err) {
        console.log(err);
        alert('Error Occured! Stream is not working!');
      }
    }
  }
}
