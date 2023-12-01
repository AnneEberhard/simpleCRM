import { Component } from '@angular/core';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading: boolean = false;


  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  async saveUser() {
    this.loading = true;
    if (this.birthDate) { //CAVE DELETE THIS if other required possibilities found
      this.user.birthDate = this.birthDate.getTime();
    }
    let docRef = this.getUsersRef();
    await addDoc(docRef, this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
      .catch(
        (err) => { console.error(err); }
      );
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleUserRef(collectionID: string, documentID: string) {
    return doc(collection(this.firestore, collectionID), documentID)
  }


  onNoClick() {
    this.dialogRef.close();
  }

}
