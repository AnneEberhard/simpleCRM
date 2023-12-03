import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-archive',
  templateUrl: './dialog-archive.component.html',
  styleUrls: ['./dialog-archive.component.scss']
})
export class DialogArchiveComponent {
  user!: User;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogArchiveComponent>) { }


  async saveUser() {
    this.loading = true;
    console.log(this.user.issue)
    await this.firebaseservice.updateUser('users', this.user)
      .then(() => {
        this.loading = false;
        const updatedUserData = this.user.toJSON();
        this.dialogRef.close(updatedUserData);
      })
      .catch(
        (err) => { console.error(err); }
      );
  }
}
