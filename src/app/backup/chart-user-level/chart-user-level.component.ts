import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart-user-level',
  templateUrl: './chart-user-level.component.html',
  template: '<div><canvas id="myChart"></canvas></div>',
  styleUrls: ['./chart-user-level.component.scss']
})
export class ChartUserLevelComponent {
  @Input() chartData: any;

  data = [
    {
      name: "0",
      value: 2,
    },
    {
      name: "2",
      value: 1,
    },
    {
      name: "Japan",
      value: 5.15,
    },
    {
      name: "Germany",
      value: 4.25,
    },
    {
      name: "United Kingdom",
      value: 3.09,
    },
  ];
  

  dataVBC = this.data;
  viewVBC: [number, number] = [800, 300];
  animationsVBC = false;
  legendVBC = true;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  yAxisLabelVBC = "Amount in Trillions ($)";

  dataLabelFormatterVBC(tooltipText: any) {
    return "$" + tooltipText + " trillion";
  }

  ngOnChanges(changes: SimpleChanges): void {

      //this.dataVBC = this.chartData;

  }
}
