import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-member-chart',
  templateUrl: './member-chart.component.html',
  styleUrls: ['./member-chart.component.scss']
})
export class MemberChartComponent {
  title = 'ng2-charts-demo';


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 6, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };



  constructor() {
  }

}
