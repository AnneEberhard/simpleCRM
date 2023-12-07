import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../firebase-service/firebase.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private cardsSubject = new BehaviorSubject<any[]>([]);
  cards$: Observable<any[]> = this.cardsSubject.asObservable();

  userCount!: number;
  userIssues!: number;
  userAverageLevel!: number;
  greetingMessage!: string;
  nameToGreet: string = 'Guest';



  constructor(public dialog: MatDialog, public firebaseservice: FirebaseService) { }

  async ngOnInit() {
    await this.firebaseservice.subUserList();
    await this.firebaseservice.subarchiveList();
    console.log(this.firebaseservice.userList);
    console.log(this.firebaseservice.archiveList);
    this.setGreetingMessage();
    this.countUsers();
    this.countIssues();
    this.countAverageLevel();
    const newCards = this.generateCards(); 
    this.setCards(newCards); 
  }
  


  setGreetingMessage() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      this.greetingMessage = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greetingMessage = 'Good Afternoon';
    } else {
      this.greetingMessage = 'Good Evening';
    }
  }

  countUsers() {
    this.userCount = 0;
    this.userCount = this.firebaseservice.userList.length;
  }

  countIssues() {
    this.userIssues = 0;
    this.firebaseservice.userList.forEach((user: { issue: any; }) => {
      if (user.issue) {
        this.userIssues++;
      }
    });
  }

  countAverageLevel() {
    let levelCount: number = 0;
    this.firebaseservice.userList.forEach((user: { level: number; }) => {
      if (user.level >= 0 && user.level <= 10) {
        levelCount = levelCount + user.level;
      }
    });
    this.userAverageLevel = Number((levelCount / this.firebaseservice.userList.length).toFixed(1));
  }


  setCards(cards: any[]) {
    this.cardsSubject.next(cards);
  }

  generateCards(): any[] {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return [
        { title: this.greetingMessage, cols: 1, rows: 1, content: this.nameToGreet },
        { title: this.userCount, cols: 1, rows: 1, content: 'Members currently enrolled' },
        { title: this.userAverageLevel, cols: 1, rows: 1, content: 'Average Level of enrolled Members' },
        { title: this.userIssues, cols: 1, rows: 1, content: 'Members with open Issues' },
        { title: this.firebaseservice.archiveCount, cols: 1, rows: 1, content: 'Archived Members' }
      ];
    }
    return [
      { title: this.greetingMessage, cols: 2, rows: 1, content: this.nameToGreet },
      { title: this.userCount, cols: 1, rows: 1, content: 'Members currently enrolled' },
      { title: this.userAverageLevel, cols: 1, rows: 1, content: 'Average Level of enrolled Members' },
      { title: this.userIssues, cols: 1, rows: 1, content: 'Members with open Issues' },
      { title: this.firebaseservice.archiveCount, cols: 1, rows: 1, content: 'Archived Members' }
    ];
  }
  
}
