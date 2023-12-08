import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/models/member.class';

@Component({
  selector: 'app-dialog-edit-level',
  templateUrl: './dialog-edit-level.component.html',
  styleUrls: ['./dialog-edit-level.component.scss']
})
export class DialogEditLevelComponent {
  member!: Member;
  value!: number;
  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditLevelComponent>) { }


  async saveMember() {
    this.loading = true;
    this.member.level = this.value;
    await this.firebaseservice.updateMember('member', this.member)
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
