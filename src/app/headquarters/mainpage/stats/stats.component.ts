import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  chart = [];
  linechart = [];
  labels1 = ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7', 'Mar 8', 'Mar 9', 'Mar 10', 'Mar 11', 'Mar 12', 'Mar 13'];
  data1 = [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451];
  labels2 = ['January', 'February', 'March', 'April', 'May', 'June'];
  data2 = [4215, 5312, 6251, 7841, 9821, 14984];
  constructor() { }

  ngOnInit(): void {
    const ctx = document.getElementById('myAreaChart');
    for (let i = 0; i < this.data2.length; i++) {
      this.data2[i] += i + 1000;
    }

    // For a particular plant p, label1 is the last 7 days,
    // and data1 is the number of hours it has flown per day in the last seven days
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels1,
        datasets: [{
          label: 'Sessions',
          lineTension: 0.3,
          backgroundColor: 'rgba(2,117,216,0.2)',
          borderColor: 'rgba(2,117,216,1)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(2,117,216,1)',
          pointBorderColor: 'rgba(255,255,255,0.8)',
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(2,117,216,1)',
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.data1,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 40000,
              maxTicksLimit: 5
            },
            gridLines: {
              color: 'rgba(0, 0, 0, .125)',
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });

    // For bar chart, In the last 1 month,
    // x axis -> Plant names; y axis -> number of hours they've flown in a month
    const ctx2 = document.getElementById('myBarChart');
    this.linechart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: this.labels2,
        datasets: [{
          label: 'Revenue',
          backgroundColor: 'rgba(2,117,216,1)',
          borderColor: 'rgba(2,117,216,1)',
          data: this.data2,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 15000,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  }

}
