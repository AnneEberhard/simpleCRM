import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { ActivatedRoute } from '@angular/router';
import { getDoc } from '@angular/fire/firestore';
import { DialogRestoreUserComponent } from '../dialog-restore-user/dialog-restore-user.component';

@Component({
  selector: 'app-archived-user-detail',
  templateUrl: './archived-user-detail.component.html',
  styleUrls: ['./archived-user-detail.component.scss']
})
export class ArchivedUserDetailComponent {
  activeId!: string;
  user!: User;
  value!: number;

  constructor(public firebaseservice: FirebaseService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1];
      this.activeId = lastSegment.toString();
    });
    this.fetchSingleUser();
  }

  async fetchSingleUser() {
    const docRef = this.firebaseservice.getSingleUserRef('archive', this.activeId);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data() as User;
        this.user = new User(userData);
        let level = this.user.level as number;
        this.value = level * 10;
      } else {
        console.log('Dokument nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Dokuments:', error);
    }
  }

openRestoreDialog() {
  const dialog = this.dialog.open(DialogRestoreUserComponent);
  dialog.afterClosed().subscribe((updatedUserData) => {
    if (updatedUserData) {
      this.user = new User(updatedUserData);
    }
  });
  dialog.componentInstance.user = new User(this.user.toJSON());
}
}
