import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/models/member.class';


@Component({
  selector: 'app-dialog-edit-member',
  templateUrl: './dialog-edit-member.component.html',
  styleUrls: ['./dialog-edit-member.component.scss']
})
export class DialogEditMemberComponent {
  member!: Member;
  formattedDate!: string;
  editBirthDate!:Date;
  loading: boolean = false; 

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogEditMemberComponent>) {  }


  async saveMember() {
    this.loading = true;
    if(this.editBirthDate) {
      this.member.birthDate = this.editBirthDate.getTime();
    }
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
