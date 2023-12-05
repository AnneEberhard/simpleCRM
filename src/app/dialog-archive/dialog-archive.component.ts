import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-archive',
  templateUrl: './dialog-archive.component.html',
  styleUrls: ['./dialog-archive.component.scss']
})
export class DialogArchiveComponent {
  user!: User;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogArchiveComponent>, private router: Router) { }

  async archiveUser(){
    this.loading = true;
    await this.firebaseservice.deleteUser(this.user)
    .then(() => {
      this.loading = false;
      const updatedUserData = this.user.toJSON();
      this.dialogRef.close(updatedUserData);
      this.router.navigate(['/user']);
    })
    .catch(
      (err) => { console.error(err); }
    );
}
  }

