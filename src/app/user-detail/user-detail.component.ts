import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { getDoc } from '@angular/fire/firestore';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditNotesComponent } from '../dialog-edit-notes/dialog-edit-notes.component';
import { DialogEditLevelComponent } from '../dialog-edit-level/dialog-edit-level.component';
import { DialogArchiveComponent } from '../dialog-archive/dialog-archive.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  activeId!: string;
  user!:User;
  value!:number;
  formattedDate!:string;

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
        const userData = docSnapshot.data();
        this.user = new User(userData);
        this.formattedDate = this.firebaseservice.getFormattedDatefromTimestamp(this.user.birthDate);
        let level = this.user.level as number;
        this.value = level * 10;
      } else {
        console.log('Dokument nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Dokuments:', error);
    }
  }
  

  openEditUserDialog() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.afterClosed().subscribe((updatedUserData) => {
      if (updatedUserData) {
        this.user = new User(updatedUserData);
      }
    });
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.formattedDate = this.formattedDate;
  }


  openEditAddressDialog() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.afterClosed().subscribe((updatedUserData) => {
      if (updatedUserData) {
        this.user = new User(updatedUserData);
      }
    });
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  openArchiveDialog() {
    const dialog = this.dialog.open(DialogArchiveComponent);
    dialog.afterClosed().subscribe((updatedUserData) => {
      if (updatedUserData) {
        this.user = new User(updatedUserData);
      }
    });
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  openEditNotesDialog() {
    const dialog = this.dialog.open(DialogEditNotesComponent);
    dialog.afterClosed().subscribe((updatedUserData) => {
      if (updatedUserData) {
        this.user = new User(updatedUserData);
      }
    });
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  openEditLevelDialog() {
    const dialog = this.dialog.open(DialogEditLevelComponent);
    dialog.afterClosed().subscribe((updatedUserData) => {
      if (updatedUserData) {
        this.user = new User(updatedUserData);
        let level = this.user.level as number;
        this.value = level * 10;
      }
    });
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}