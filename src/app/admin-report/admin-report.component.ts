import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { GraphQLClient } from 'graphql-request';
import { HttpClient } from '@angular/common/http';
import { DataStoreService } from '../data-store.service';

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
        rback(where: {plantName: {_eq: "${plantChosen}"}}) {
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
        console.log(this.reports);
      })
      .catch((err) => err);
  }

  async sendGqlRequest(q: string) {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
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
    // this.loading = true;
    this.reports[i].loading = true;
    // Upload the new file to s3
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
            console.log(result);
            this.reports[i].showInput = false;
            this.reports[i].access = 'plant';
            this.reports[i].loading = false;
          }
        });

  }
  openUrl(url: string) {
    window.open(url, '_blank');
  }
}
