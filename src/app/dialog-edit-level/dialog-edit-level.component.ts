import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-level',
  templateUrl: './dialog-edit-level.component.html',
  styleUrls: ['./dialog-edit-level.component.scss']
})
export class DialogEditLevelComponent {
  user!: User;
  value!: number;
  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditLevelComponent>) { }


  async saveUser() {
    this.loading = true;
    this.user.level = this.value;
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
