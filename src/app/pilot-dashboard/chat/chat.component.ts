import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/data-store.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string;
  plantName: string;
  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.plantName = this.dataStore.getDataStore('plant');
  }

  // FIXME: Add a method to send the message to the omnipresent admin
  async sendMessage() {
    console.log(this.message);
    console.log(this.plantName);
  }
}
