import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  plantname = '';
  data: any;
  reports: any;
  constructor(public logout: LogoutService, private dataStore: DataStoreService) { }

  async ngOnInit() {
    this.plantname = this.dataStore.getDataStore('plant');
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `query MyQuery {
      rback(where: {_and: {access: {_eq: "plant"}, plantName: {_eq: "${this.plantname}"}}}, order_by: {dateOfReportWriting: desc}) {
        access
        plantName
        dateOfReportWriting
        documentReferenceNumber
        fileUrl
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
      })
      .catch((err) => err);
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }
}
