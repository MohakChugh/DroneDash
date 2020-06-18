import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  smsUrl = 'https://2factor.in/API/V1/6dd0d498-b156-11ea-9fa5-0200cd936042/ADDON_SERVICES/SEND/TSMS';
  constructor(private http: HttpClient) { }

  sendsms(message: string, phonenumber: number) {
    const form = new FormData();
    form.append('From', 'omnipr');
    form.append('TemplateName', 'notification');
    form.append('To', `${phonenumber}`);

    this.http.post(this.smsUrl, form)
    .subscribe(res => {
      console.log(res);
    });
  }
}
