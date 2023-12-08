import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/models/member.class';

@Component({
  selector: 'app-dialog-edit-notes',
  templateUrl: './dialog-edit-notes.component.html',
  styleUrls: ['./dialog-edit-notes.component.scss']
})
export class DialogEditNotesComponent {
  member!: Member;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditNotesComponent>) { }


  async saveMember() {
    this.loading = true;
    await this.firebaseservice.updateUser('members', this.member)
      .then(() => {
        this.loading = false;
        const updatedUserData = this.member.toJSON();
        this.dialogRef.close(updatedUserData);
      })
      .catch(
        (err) => { console.error(err); }
      );
  }
}
