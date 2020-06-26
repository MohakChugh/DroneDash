import { Injectable } from '@angular/core';
import * as axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  smsUrl = 'https://2factor.in/API/V1/81284ac9-a3a6-11e9-ade6-0200cd936042/ADDON_SERVICES/SEND/PSMS';
  constructor() { }

  sendsms(message: string, phonenumber: number) {

    console.log(`Message: ${message}, Sending to : ${phonenumber}`);

    const form = new FormData();
    form.append('From', 'Mohak Chugh');
    form.append('Msg', `${message}`);
    form.append('To', `${phonenumber}`);
    axios.default.post(this.smsUrl, {
      From: 'MKNODE',
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
