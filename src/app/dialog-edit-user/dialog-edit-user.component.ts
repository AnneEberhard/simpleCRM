import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: User;
  formattedDate!: string;
  editBirthDate!:Date;
  loading: boolean = false; 

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditUserComponent>) {  }


  async saveUser() {
    this.loading = true;
    if(this.editBirthDate) {
      this.user.birthDate = this.editBirthDate.getTime();
    }
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
