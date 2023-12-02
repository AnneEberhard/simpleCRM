import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: User;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }


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
