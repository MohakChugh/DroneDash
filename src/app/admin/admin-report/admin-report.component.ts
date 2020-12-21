import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { GraphQLClient } from 'graphql-request';
import { HttpClient } from '@angular/common/http';
import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  reports: any;
  data: any;
  showInput = false;
  file: File;
  response: any;
  // location: string;
  loading = false;
  constructor(public logout: LogoutService, private http: HttpClient, private dataStore: DataStoreService) {
  }

  onSelectedFile(event) {
    this.file = event.target.files[0];
  }

  async ngOnInit() {
    const plantChosen = this.dataStore.getDataStore('plantChosen');
    let query = ``;
    if (plantChosen) {
      query = `query MyQuery {
        rback(where: {plantName: {_eq: "${plantChosen}"}}, order_by: {dateOfReportWriting: desc}) {
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
      }
      `;
    } else {
      query = `query MyQuery {
        rback(order_by: {dateOfReportWriting: desc}) {
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
      }`;
    }

    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
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
      .catch((err) => err);
  }

  async sendGqlRequest(q: string) {
    const client = new GraphQLClient('https://hindalco-database.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = q;
    return await client.request(query)
      .then(data => data)
      .catch((err) => err);
  }

  changeAccess(i: number) {
    this.reports[i].showInput = true;
  }

  async validate(i: number) {
    this.reports[i].loading = true;
    const formdata = new FormData();
    formdata.append('file', this.file);
    this.http.post('https://omnipresent-dashboard-backend.herokuapp.com/upload', formdata)
      .subscribe(async res => {
        this.response = res;
        if (this.response.error === false) {
          // Update the new link and access to the database
          const query = `mutation MyMutation {
              update_rback(where: {id: {_eq: "${this.reports[i].id}"}}, _set: {access: "plant", fileUrl: "${this.response.Data[0].Location}"}) {
                affected_rows
              }
            }`;
          const result = await this.sendGqlRequest(query);
          this.reports[i].showInput = false;
          this.reports[i].access = 'plant';
          this.reports[i].loading = false;
        }
      });

  }
  openUrl(url: string) {
    window.open(url, '_blank');
  }

  async deleteReport(id: any) {
    const result = confirm('Are you sure you want to delete this file?');
    if (result) {
      const client = new GraphQLClient('https://omnipresent-dashboard-backend.herokuapp.com/upload', {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'omnipresent'
        },
      });
      let query = `mutation MyMutation {
        delete_rback(where: {id: {_eq: "${id}"}}) {
          affected_rows
        }
      }`;
      await client.request(query)
        .then(data => data)
        .catch((err) => err);

      const plantChosen = this.dataStore.getDataStore('plantChosen');
      if (plantChosen) {
        query = `query MyQuery {
          rback(where: {plantName: {_eq: "${plantChosen}"}}, order_by: {dateOfReportWriting: desc}) {
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
        }`;
      } else {
        query = `query MyQuery {
          rback(order_by: {dateOfReportWriting: desc}) {
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
        }`;
      }
      await client.request(query)
        .then(data => {
          this.data = data;
          this.reports = this.data.rback;
        })
        .catch((err) => err);
    }
  }
}
