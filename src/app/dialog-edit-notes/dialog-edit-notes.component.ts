import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
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
    await this.firebaseservice.updateMember('members', this.member)
      .then(() => {
        this.loading = false;
        const updatedMemberData = this.member.toJSON();
        this.dialogRef.close(updatedMemberData);
      })
      .catch(
        (err) => { console.error(err); }
      );
  }
}
