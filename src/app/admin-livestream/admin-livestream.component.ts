import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import * as flvjs from 'flv.js';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-admin-livestream',
  templateUrl: './admin-livestream.component.html',
  styleUrls: ['./admin-livestream.component.css']
})
export class AdminLivestreamComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  company_name = 'Hindalco';
  Time = new Date();
  users = [];
  names = [];
  liveStreamBaseUrl = 'ws://35.222.157.43:8000/live/';
  urls = [];
  liveStreamOn = false;
  liveStreamUrl: string;
  response: any;
  status = [];
  constructor(public logout: LogoutService) { }

  async ngOnInit() {

    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      user(where: {role: {_eq: "plant"}}) {
        name
        user_to_missionStatus {
          status
        }
      }
    }`;
    await client.request(query)
      .then(data => {
        this.response = data;
        this.users = this.response.user;
        this.users.forEach(element => {
          this.names.push(element.name);
          this.status.push(element.user_to_missionStatus[0].status);
        });
        this.names.forEach(element => {
          this.urls.push(`${this.liveStreamBaseUrl}${element}`);
        });
      })
      .catch(err => console.log(err));
  }

  async player(index) {
    this.liveStreamUrl = this.urls[index];
    this.liveStreamOn = true;
    setTimeout(async () => {
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
          alert('Error Occured! Stream is not working!');
        }
      }
    }, 1000);
  }
}
