import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  plantname = '';
  data: any;
  reports: any;
  constructor(public logout: LogoutService) { }

  async ngOnInit() {
    this.plantname = localStorage.getItem('plant');
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      rback(where: {access: {_eq: "plant"}, _and: {plantName: {_eq: "${this.plantname}"}}}) {
        access
        dateOfReportWriting
        documentReferenceNumber
        fileUrl
        plantName
        reportName
        reportMonth
        reportby
      }
    }
    `;
    await client.request(query)
              .then(data => {
                this.data = data;
                this.reports = this.data.rback;
              })
              .catch((err) => err);
  }

}
