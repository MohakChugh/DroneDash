import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from '../data-store.service';
import { LogoutService } from '../logout.service';

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

  loading = false;

  fileUploadUrl = 'https://omnipresent-dashboard-backend.herokuapp.com/upload';
  constructor(private http: HttpClient, private dataStore: DataStoreService, public logout: LogoutService) { }

  ngOnInit(): void {
    this.plantName = this.dataStore.getDataStore('plant');
  }

  onSelectedFile(event) {
    this.file = event.target.files[0];
  }

  upload() {
    const plantname = this.plantName;
    const reportby = this.reportBy;
    const reportMonth = this.reportMonth;
    const reportName = this.reportName;
    const documentReferenceNumber = this.documentReferenceNumber;
    const dateOfReport = this.dateOfReport;

    this.loading = true;
    /* Check if all the form item fields are filled or not */
    // tslint:disable-next-line: max-line-length
    if (this.file && this.reportBy && this.reportMonth && this.reportName && this.documentReferenceNumber && this.plantName && this.dateOfReport) {
      const formdata = new FormData();
      formdata.append('file', this.file);
      this.http.post(this.fileUploadUrl, formdata)
        .subscribe(async res => {
          this.response = res;
          if (this.response.error === false) {
            this.location = this.response.Data[0].Location;
            // Now add this location in the url of the file being uploaded
            // Add the data from here into the database, with an access level of primary
            const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
              headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'omnipresent'
              },
            });

            this.plantName = this.plantName.toLowerCase();
            this.reportBy = this.reportBy.toLowerCase();
            this.reportMonth = this.reportMonth.toLowerCase();
            this.reportName = this.reportName.toLowerCase();
            this.location = this.location.toLowerCase();

            const location = this.location;

            const query = `mutation MyMutation {
              insert_rback(objects: {
                access: "AdminOnly",
                dateOfReportWriting: "${dateOfReport}",
                documentReferenceNumber: "${documentReferenceNumber}",
                plantName: "${plantname}",
                reportMonth: "${reportMonth}",
                reportName: "${reportName}",
                reportby: "${reportby}",
                fileUrl: "${location}"
              }) {
                returning {
                  id
                }
              }
            }`;

            await client.request(query)
              .then(data => {
                this.loading = false;
                alert('Uploaded!');
              })
              .catch((err) => err);
          }
        });
    } else {
      this.loading = false;
      alert('One or more forms fields are Empty!');
    }
  }
}
