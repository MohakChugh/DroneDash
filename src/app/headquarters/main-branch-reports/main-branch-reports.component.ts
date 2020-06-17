import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from '../../services/data-store.service';

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
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    const plantChosen = this.dataStore.getDataStore('plantChosen');
    let query = ``;
    if (plantChosen) {
      query = `query MyQuery {
        rback(where: {_and: {plantName: {_eq: "${plantChosen}"}, access: {_eq: "plant"}}}, order_by: {dateOfReportWriting: desc}) {
          access
          id
          plantName
          dateOfReportWriting
          documentReferenceNumber
          fileUrl
          reportMonth
          reportName
          reportby
        }
      }
      `;
    } else {
      query = `query MyQuery {
        rback(where: {access: {_eq: "plant"}}, order_by: {dateOfReportWriting: desc}) {
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
    }

    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });

    await client.request(query)
      .then(data => {
        this.data = data;
        this.reports = this.data.rback;
      })
      .catch(err => console.log(err));
  }
  openUrl(url: string) {
    window.open(url, '_blank');
  }
}
