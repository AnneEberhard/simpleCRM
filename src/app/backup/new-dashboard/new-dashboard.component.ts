import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../../firebase-service/firebase.service';
import { QueryDocumentSnapshot, limit, onSnapshot, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  user = new User();
  userList: any = [];

  unsubUserList;

  constructor(public dialog: MatDialog, public firebaseservice: FirebaseService) { 
    this.unsubUserList = this.subUserList();
   }

  ngOnInit(): void {
   this.unsubUserList = this.subUserList();
    }

    subUserList() {
      const q = query(this.firebaseservice.getUsersRef('users'), limit(100));
      return onSnapshot(q, (querySnapshot) => {
        this.userList = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const userData = doc.data();
          const user = new User(userData);
          this.userList.push(user);
        });
      });
    }
  

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Overview Active Members', cols: 1, rows: 1 },
          { title: 'Issues', cols: 1, rows: 1 },
          { title: 'Archived Members', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Overview Active Members', cols: 2, rows: 1 },
        { title: 'Issues', cols: 1, rows: 1 },
        { title: 'Archived Members', cols: 1, rows: 1 }
      ];
    })
  );
}
