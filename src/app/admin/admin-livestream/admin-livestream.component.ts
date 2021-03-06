import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import * as flvjs from 'flv.js';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from 'src/app/services/data-store.service';
import { SmsService } from 'src/app/services/sms.service';
import { PhoneNumberService } from 'src/app/services/phone-number.service';

@Component({
  selector: 'app-admin-livestream',
  templateUrl: './admin-livestream.component.html',
  styleUrls: ['./admin-livestream.component.css']
})
export class AdminLivestreamComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  company_name = 'Hindalco';
  Time = new Date();
  users: any = [];
  names: any = [];
  liveStreamBaseUrl = 'ws://35.222.157.43:8000/live/';
  urls: any = [];
  liveStreamOn = [];
  liveStreamUrl: string;
  response: any;
  status = [];
  isMainBranch: boolean;
  constructor(
    public logout: LogoutService,
    private dataStore: DataStoreService,
    private sms: SmsService,
    private phoneNumber: PhoneNumberService
  ) { }

  async ngOnInit() {

    this.isMainBranch = this.dataStore.getDataStore('isMainBranch');
    if (this.isMainBranch) { this.isMainBranch = true; }
    else { this.isMainBranch = false; }

    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
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
          this.liveStreamOn.push(false);
        });
        this.names.forEach(element => {
          this.urls.push(`${this.liveStreamBaseUrl}${element}`);
        });
      })
      .catch(err => console.log(err));
  }

  async player(index) {
    this.liveStreamUrl = this.urls[index];
    // this.liveStreamOn = true;
    this.liveStreamOn[index] = true;
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

  async requestLiveStream(name: string) {
    const numPhone = this.phoneNumber[name];
    const adminPhone = this.phoneNumber.admin;

    console.log(numPhone);
    console.log(adminPhone);

    // numPhone.forEach(ph => {
    //   this.sms.sendsms(`Headquarter has requested to see the livestream of ${name} Plant. Please start the livestream ASAP`, ph);
    // });

    // adminPhone.forEach(ph => {
    //   this.sms.sendsms(`Headquarter has requested to see the livestream of ${name} Plant. Please start the livestream ASAP`, ph);
    // });

    // tslint:disable-next-line: max-line-length
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `mutation MyMutation {
      insert_message(objects: {by: "Headquater", message: "Headquarter has requested to see the livestream of ${name} Plant. Please start the livestream ASAP", plant: "Hindalco Headquarter"}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => { alert('Request Sent!'); })
      .catch(err => console.log(err));
  }
}
