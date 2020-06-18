import { Injectable } from '@angular/core';
import * as axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  smsUrl = 'https://2factor.in/API/V1/6dd0d498-b156-11ea-9fa5-0200cd936042/ADDON_SERVICES/SEND/TSMS';
  constructor() { }

  sendsms(message: string, phonenumber: number) {
    const form = new FormData();
    form.append('From', 'Omnipr');
    form.append('Msg', `${message}`);
    form.append('To', `${phonenumber}`);
    axios.default.post(this.smsUrl, {
      From: 'OMNIPR',
      Msg: `${message}`,
      To: `${phonenumber}`

    }).then(
      (response) => {
        console.log('Request sent');
        console.log(response.data);
      }
    ).catch(
      () => {
        console.log('Error in request');
      }
    );
  }
}
