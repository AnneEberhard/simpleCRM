import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, collectionData, onSnapshot, query, limit, QueryDocumentSnapshot, getDocs} from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

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
          const docId = doc.id;
          const userData = doc.data();
          const user = new User(userData);
          user.id = docId;
          this.userList.push(user);
          this.firebaseservice.updateUser('users', user);
        });
      });
    }
    

  openDialogue() {
    this.dialog.open(DialogAddUserComponent);
  }

  ngonDestroy() {
    this.unsubUserList(); //beendet das alles wieder
  }
}

