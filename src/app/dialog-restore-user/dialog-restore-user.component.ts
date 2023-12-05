import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-restore-user',
  templateUrl: './dialog-restore-user.component.html',
  styleUrls: ['./dialog-restore-user.component.scss']
})
export class DialogRestoreUserComponent {
  user!: User;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogRestoreUserComponent>, private router: Router) { }

  async restoreUser(){
    this.loading = true;
    await this.firebaseservice.deleteUser('archive','users',  this.user)
    .then(() => {
      this.loading = false;
      const updatedUserData = this.user.toJSON();
      this.dialogRef.close(updatedUserData);
      this.router.navigate(['/archive']);
    })
    .catch(
      (err) => { console.error(err); }
    );
}
}
