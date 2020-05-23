import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as axios from 'axios';

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent implements OnInit {

  file: File;
  reportName: string;
  reportMonth: string;
  documentReferenceNumber: string;
  dateOfReport: string;
  plantName: string;
  reportBy: string;

  fileUploadUrl = 'https://omnipresent-dashboard-backend.herokuapp.com/upload';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // FIXME: CORS ERROR IN FILE UPLOAD
  upload() {
    const formdata: FormData = new FormData();
    console.log(this.file);
    formdata.append('file', this.file);
    const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'multipart/form-data');
    this.http.post(this.fileUploadUrl, formdata, {headers})
      .subscribe(res => {
        console.log(res);
      });

    // const httpHeaders = new HttpHeaders();
    // const headers = { headers: {
    //   'Content-Type': 'multipart/form-data',
    //   Accept: '*/*',
    //   'Access-Control-Allow-Origin': '*'
    // }};

    // axios.default.post(this.fileUploadUrl, formdata, headers)
    //   .then(response => {
    //     if (response.data.error === false) {
    //       console.log(response.data);
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // console.log(this.file);
    // console.log(this.reportBy);
    // console.log(this.reportMonth);
    // console.log(this.reportName);
    // console.log(this.documentReferenceNumber);
    // console.log(this.plantName);
    // console.log(this.dateOfReport);
  }
}
