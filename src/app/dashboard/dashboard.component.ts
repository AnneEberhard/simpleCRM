import { Component,  OnInit, inject, ElementRef  } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../firebase-service/firebase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



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

  constructor(public dialog: MatDialog, public firebaseservice: FirebaseService, public authservice: AuthService, public router: Router) { }

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
    return [
      { title: this.greetingMessage, show: false, action: '', cols: 2, rows: 1, content: this.nameToGreet },
      { title: this.memberCount, show: true, action: () => this.navigateToMember('none'), cols: 1, rows: 1, content: 'Members' },
      { title: this.memberAverageLevel, show: true, action: () => this.scrollToElement('levelChart'), cols: 1, rows: 1, content: 'Average Level' },
      { title: this.memberIssues, show: true, action: () => this.navigateToMember('issue'), cols: 1, rows: 1, content: 'Open Issues' },
      { title: this.firebaseservice.archiveCount, show: true, action: () => this.navigateToArchive(), cols: 1, rows: 1, content: 'Archived Members' }
    ];
  }


  navigateToMember(filter): void {
    if (filter == 'issue') {
      this.firebaseservice.issueFilter = true;
    }
    this.router.navigate(['/member']);
  }

  navigateToArchive(): void {
    this.router.navigate(['/archive']);
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
