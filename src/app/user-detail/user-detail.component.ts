import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { getDoc } from '@angular/fire/firestore';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  activeId!: string;
  activeUser = new User;

  constructor(public firebaseservice: FirebaseService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1];
      this.activeId = lastSegment.toString();
    });
    this.fetchSingleUser();
  }

  async fetchSingleUser() {
    const docRef = this.firebaseservice.getSingleUserRef('users', this.activeId);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data() as User;
        const userWithId = { ...userData, id: this.activeId };
        this.activeUser = userData;
        console.log('Single User Data:', userWithId);
        console.log('Single User Name:', userData.city);
      } else {
        console.log('Dokument nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Dokuments:', error);
    }
  }

  openEditUserDialog() {
    console.log('open Edit');
    this.dialog.open(DialogEditUserComponent);
  }

  openEditAddressDialog() {
    console.log('open Edit');
    this.dialog.open(DialogEditAddressComponent);
  }

  openArchiveDialog() {
    console.log('open Archive');
  }
}