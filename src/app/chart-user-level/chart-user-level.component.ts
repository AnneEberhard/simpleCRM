import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Member } from 'src/models/member.class';

interface LevelCount {
  name: string;
  value: number;}

@Component({
  selector: 'app-chart-user-level',
  templateUrl: './chart-user-level.component.html',
  template: '<div><canvas id="myChart"></canvas></div>',
  styleUrls: ['./chart-user-level.component.scss']
})



export class ChartUserLevelComponent {
  @Input() chartData: any;

  data: { name: string; value: number; }[];
  dataVBC: { name: string; value: number; }[];
  viewVBC: [number, number] = [800, 300];
  animationsVBC = false;
  legendVBC = false;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  yAxisLabelVBC = "Number of Members per Level";


  constructor(public firebaseservice: FirebaseService) {

  }

  async ngOnInit() {
    await this.firebaseservice.subMemberList();
    const members: Member[] = this.firebaseservice.memberList;
    const levelCounts = this.countMembersByLevel(members);
    const transformedData = this.transformLevelCounts(levelCounts);
    console.log(transformedData);
    this.data = this.transformLevelCounts(levelCounts);
    this.dataVBC = this.data;
  }

  dataLabelFormatterVBC(tooltipText: any) {
    return tooltipText;
  }

  ngOnChanges(changes: SimpleChanges): void { }



  countMembersByLevel(members: Member[]): { [key: string]: number } {
    const levelCounts: { [key: string]: number } = {};

    members.forEach((member) => {
      const level = member.level.toString(); // Convert level to string to use it as the key
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    return levelCounts;
  }

  transformLevelCounts(levelCounts: { [key: string]: number }): LevelCount[] {
    const result: LevelCount[] = [];

    for (let i = 0; i <= 9; i++) {
      const level = i.toString();
      const count = levelCounts[level] || 0;

      result.push({ name: level, value: count });
    }

    return result;
  }
}
