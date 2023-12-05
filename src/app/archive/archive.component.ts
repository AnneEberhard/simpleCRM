import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from 'src/models/user.class';
import { QueryDocumentSnapshot, limit, onSnapshot, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  user = new User();
  userList: any = [];

  unsubUserList;
  
  constructor(public firebaseservice: FirebaseService) { 
    this.unsubUserList = this.subUserList();
   }

  ngOnInit(): void {
   this.unsubUserList = this.subUserList();
    }

    subUserList() {
      const q = query(this.firebaseservice.getUsersRef('archive'), limit(100));
    
      return onSnapshot(q, (querySnapshot) => {
        this.userList = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docId = doc.id;
          const userData = doc.data();
          const user = new User(userData);
          user.id = docId;
          this.userList.push(user);
          this.firebaseservice.updateUser('archive', user);
        });
      });
    }

  ngonDestroy() {
    this.unsubUserList(); //beendet das alles wieder
  }
}
