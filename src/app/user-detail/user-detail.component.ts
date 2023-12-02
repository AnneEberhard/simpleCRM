import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DocumentReference, DocumentData, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  activeId!: string;
  activeUser!: User;

  constructor(public firebaseservice: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1];
      this.activeId = lastSegment.toString();
      console.log('activeId:', this.activeId);
    });
  
    this.firebaseservice.fetchSingleUser(this.activeId)
      .then(user => {
        this.activeUser = user;
        console.log(this.activeUser);
      })
      .catch(error => {
        console.error(error);
    });
  }

  //async fetchSingleUser() {
  //  const docRef = this.firebaseservice.getSingleUserRef('users', this.activeId);
  //  try {
  //    const docSnapshot = await getDoc(docRef);
  //    if (docSnapshot.exists()) {
  //      const userData = docSnapshot.data() as User; 
  //      const userWithId = { ...userData, id: this.activeId };
  //      this.activeUser = userData;
  //      console.log('Single User Data:', userWithId);
  //      console.log('Single User Name:', userData.city);
  //    } else {
  //      console.log('Dokument nicht gefunden.');
  //    }
  //  } catch (error) {
  //    console.error('Fehler beim Abrufen des Dokuments:', error);
  //  }
  //}
}