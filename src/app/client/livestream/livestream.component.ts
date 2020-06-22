import { Component, OnInit, ErrorHandler } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import * as flvjs from 'flv.js';
import { DataStoreService } from '../../services/data-store.service';
import { GraphQLClient } from 'graphql-request';
import { SmsService } from 'src/app/services/sms.service';
import { PhoneNumberService } from 'src/app/services/phone-number.service';
import { element } from 'protractor';

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
  res: any;
  missionStatus: string;
  constructor(
    public logout: LogoutService,
    private dataStore: DataStoreService,
    private sms: SmsService,
    private phoneNumber: PhoneNumberService
  ) { }

  async ngOnInit() {
    this.CompanyName = this.dataStore.getDataStore('plant');

    this.CompanyName = this.CompanyName.toLowerCase();
    this.liveStreamUrl = this.liveStreamUrl + this.CompanyName + '.flv';
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      missionStatus(where: {plant: {_eq: "${this.CompanyName}"}}) {
        status
      }
    }`;
    await client.request(query)
      .then(data => {
        this.res = data;
        this.missionStatus = this.res.missionStatus[0].status;
      })
      .catch(err => console.log(err));
  }

  async player() {
    this.liveStreamOn = true;
    setTimeout(async () => {
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
    }, 1000);
  }

  async sendSMS() {
    // Find the appropriate Phone Numbers and send them sms Notifications
    const numPhone = this.phoneNumber[this.CompanyName];
    numPhone.forEach(ph => {
      this.sms.sendsms('Client is requesting to see the livestream', ph);
    });

    const adminPhone = this.phoneNumber.admin;
    adminPhone.forEach(ph => {
      this.sms.sendsms(`Client is requesting to see the livestream of plant ${this.CompanyName}`, ph);
    });

    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `mutation MyMutation {
      insert_message(
    objects: { by: "Plant",
    message: "The Client from plant ${this.CompanyName} has requested to see the livestream. Please Start the livestream ASAP",
    plant: "${ this.CompanyName }"
    }) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => {
      })
      .catch(err => console.log(err));
    alert('Request Sent');
  }
}
