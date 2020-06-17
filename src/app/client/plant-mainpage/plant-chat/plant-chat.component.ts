import { Component, OnInit } from '@angular/core';
import { GraphQLClient } from 'graphql-request';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-plant-chat',
  templateUrl: './plant-chat.component.html',
  styleUrls: ['./plant-chat.component.css']
})
export class PlantChatComponent implements OnInit {

  message: string;
  plantName: string;
  isSent = false;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.plantName = this.dataStore.getDataStore('plant');
  }

  async sendMessage() {
    const client = new GraphQLClient('https://rbacksystem-fileupload.herokuapp.com/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'omnipresent'
      },
    });
    const query = `mutation MyMutation {
      insert_message(objects: {by: "Plant", message: "${this.message}", plant: "${this.plantName}"}) {
        affected_rows
      }
    }`;
    await client.request(query)
      .then(data => {
        this.isSent = true;
        setTimeout(() => {
          this.isSent = false;
        }, 2000);
      })
      .catch(err => console.log(err));
  }

}
