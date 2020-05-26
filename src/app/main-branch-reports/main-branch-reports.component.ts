import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-main-branch-reports',
  templateUrl: './main-branch-reports.component.html',
  styleUrls: ['./main-branch-reports.component.css']
})
export class MainBranchReportsComponent implements OnInit {

  reports: any;
  data: any;
  showInput = false;
  file: File;
  response: any;
  // location: string;
  loading = false;
  constructor(public logout: LogoutService) { }

  async ngOnInit() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      rback(where: {access: {_eq: "plant"}}) {
        access
        dateOfReportWriting
        documentReferenceNumber
        fileUrl
        id
        plantName
        reportMonth
        reportby
        reportName
      }
    }`;
    await client.request(query)
      .then(data => {
        this.data = data;
        this.reports = this.data.rback;
        console.log(this.reports);
      })
      .catch((err) => err);
  }
  // async sendGqlRequest(q: string) {
  //   const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
  //     headers: {
  //       'content-type': 'application/json',
  //       'x-hasura-admin-secret': 'omnipresent'
  //     },
  //   });
  //   const query = q;
  //   return await client.request(query)
  //     .then(data => data)
  //     .catch((err) => err);
  // }

}
