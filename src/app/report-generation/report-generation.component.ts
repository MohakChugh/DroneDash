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

  response: any;
  location: string;

  fileUploadUrl = 'https://omnipresent-dashboard-backend.herokuapp.com/upload';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSelectedFile(event) {
    this.file = event.target.files[0];
  }

  upload() {
    /* Check if all the form item fields are filled or not */
    // tslint:disable-next-line: max-line-length
    if (this.file && this.reportBy && this.reportMonth && this.reportName && this.documentReferenceNumber && this.plantName && this.dateOfReport) {
      const formdata = new FormData();
      formdata.append('file', this.file);
      this.http.post(this.fileUploadUrl, formdata)
        .subscribe(res => {
          this.response = res;
          if (this.response.error === false) {
            this.location = this.response.Data[0].Location;
            // Now add this location in the url of the file being uploaded
            // Add the data from here into the database, with an access level of primary
          }
        });
    } else {
      alert('One or more forms fields are Empty!');
    }
    // console.log(this.file);
    // console.log(this.reportBy);
    // console.log(this.reportMonth);
    // console.log(this.reportName);
    // console.log(this.documentReferenceNumber);
    // console.log(this.plantName);
    // console.log(this.dateOfReport);
  }
}
