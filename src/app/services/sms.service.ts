import { Injectable } from '@angular/core';
import * as axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  // smsUrl = 'https://2factor.in/API/V1/6dd0d498-b156-11ea-9fa5-0200cd936042/ADDON_SERVICES/SEND/TSMS';
  smsUrl = 'https://2factor.in/API/R1/?module=PROMO_SMS&apikey=6dd0d498-b156-11ea-9fa5-0200cd936042&to=9810178257&from=omnipr&msg=HI';
  constructor() { }

  sendsms(message: string, phonenumber: number) {
    const form = new FormData();
    form.append('From', 'Omnipr');
    form.append('TemplateName', 'notification');
    form.append('To', `${phonenumber}`);
    axios.default.post(this.smsUrl, {
      From: 'omnipr',
      TemplateName: `notification`,
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
