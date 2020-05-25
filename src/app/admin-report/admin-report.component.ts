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
        access
        dateOfReportWriting
        documentReferenceNumber
        fileUrl
        plantName
        id
        reportMonth
        reportName
        reportby
      }
    }
    `;
    await client.request(query)
      .then(data => {
        this.data = data;
        this.reports = this.data.rback;
        console.log(this.reports);
      })
      .catch((err) => err);


    // for (let i = 0; i < this.reports.length; i++) {
    //   if (this.reports[i].access == 'plant') {
    //     this.reports[i].access = false;
    //   } else {
    //     this.reports[i].access = true;
    //   }
    // }
  }

}
