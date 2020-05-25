import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphQLClient } from 'graphql-request';

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

            const query = `mutation MyMutation {
              insert_rback(objects: {
                access: "AdminOnly",
                dateOfReportWriting: "${this.dateOfReport}",
                documentReferenceNumber: "${this.documentReferenceNumber}",
                plantName: "${this.plantName}",
                reportMonth: "${this.reportMonth}",
                reportName: "${this.reportName}",
                reportby: "${this.reportBy}",
                fileUrl: "${this.location}"
              }) {
                returning {
                  id
                }
              }
            }`;

            await client.request(query)
              .then(data => {
                alert('Uploaded!');
              })
              .catch((err) => err);
          }
        });
    } else {
      alert('One or more forms fields are Empty!');
    }
  }
}
