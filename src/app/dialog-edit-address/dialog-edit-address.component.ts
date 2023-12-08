import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/models/member.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  member!: Member;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }


  async saveMember() {
    this.loading = true;
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
