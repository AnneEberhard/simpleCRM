import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../firebase-service/firebase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private cardsSubject = new BehaviorSubject<any[]>([]);
  cards$: Observable<any[]> = this.cardsSubject.asObservable();


  greetingMessage!: string;
  nameToGreet: string;
  memberCount: number = 0;
  memberIssues!: number;
  memberAverageLevel!: number;

  constructor(public dialog: MatDialog, public firebaseservice: FirebaseService, public authservice: AuthService) { }

  async ngOnInit() {
    await this.firebaseservice.subMemberList();
    await this.firebaseservice.subarchiveList();
    this.setGreetingMessage();
    this.countMembers();
    this.countIssues();
    this.countAverageLevel();
    this.nameToGreet = this.authservice.auth.currentUser?.displayName;
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


  countMembers() {
    if (this.firebaseservice.memberList.length > 0) {
      this.memberCount = this.firebaseservice.memberList.length;
    } else {
      this.memberCount = 0;
    }
  }


  countIssues() {
    this.memberIssues = 0;
    this.firebaseservice.memberList.forEach((member: { issue: any; }) => {
      if (member.issue) {
        this.memberIssues++;
      }
    });
  }


  countAverageLevel() {
    let levelCount: number = 0;
    this.firebaseservice.memberList.forEach((member: { level: number; }) => {
      if (member.level >= 0 && member.level <= 10) {
        levelCount = levelCount + member.level;
      }
    });
    this.memberAverageLevel = Number((levelCount / this.firebaseservice.memberList.length).toFixed(1));
  }


  setCards(cards: any[]) {
    this.cardsSubject.next(cards);
  }


  generateCards(): any[] {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return [
        { title: this.greetingMessage, cols: 2, rows: 1, content: this.nameToGreet },
        { title: this.memberCount, cols: 1, rows: 1, content: 'Members' },
        { title: this.memberAverageLevel, cols: 1, rows: 1, content: 'Average Level' },
        { title: this.memberIssues, cols: 1, rows: 1, content: 'Open Issues' },
        { title: this.firebaseservice.archiveCount, cols: 1, rows: 1, content: 'Archived Members' }
      ];
    }
    return [
      { title: this.greetingMessage, cols: 2, rows: 1, content: this.nameToGreet },
      { title: this.memberCount, cols: 1, rows: 1, content: 'Members currently enrolled' },
      { title: this.memberAverageLevel, cols: 1, rows: 1, content: 'Average Level of enrolled Members' },
      { title: this.memberIssues, cols: 1, rows: 1, content: 'Members with open Issues' },
      { title: this.firebaseservice.archiveCount, cols: 1, rows: 1, content: 'Archived Members' }
    ];
  }

}
