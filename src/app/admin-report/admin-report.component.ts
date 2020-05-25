import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  reports: any;
  data: any;
  constructor(public logout: LogoutService) {
  }

  async ngOnInit() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      rback {
        fileUrl
        dateOfReportWriting
        documentReferenceNumber
        plantName
        reportMonth
        reportName
        reportby
      }
    }`;
    await client.request(query)
              .then(data => {
                this.data = data;
                this.reports = this.data.rback;
              })
              .catch((err) => err);
  }

}
