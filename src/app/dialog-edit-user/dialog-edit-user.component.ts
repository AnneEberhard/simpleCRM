import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: User;
  birthDate!: Date;
  loading: boolean = false; 

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }


  async saveUser() {
    this.loading = true;

    let docRef = this.firebaseservice.getUsersRef();
    await addDoc(docRef, this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
      .catch(
        (err) => { console.error(err); }
      );
  }
}
