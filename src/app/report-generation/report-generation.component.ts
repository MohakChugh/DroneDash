import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent implements OnInit {

  file: File;
  reportName: string;
  reportMonth: string;
  documentReferenceNumber: string;
  dateOfReport: string;
  plantName: string;
  reportBy: string;
  constructor() { }

  ngOnInit(): void {
  }

  upload() {
    console.log(this.file);
    console.log(this.reportBy);
    console.log(this.reportMonth);
    console.log(this.reportName);
    console.log(this.documentReferenceNumber);
    console.log(this.plantName);
    console.log(this.dateOfReport);
  }
}
