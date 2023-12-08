import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.class';


@Component({
  selector: 'app-dialog-restore-member',
  templateUrl: './dialog-restore-member.component.html',
  styleUrls: ['./dialog-restore-member.component.scss']
})
export class DialogRestoreMemberComponent {
  member!: Member;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogRestoreMemberComponent>, private router: Router) { 
  }

  async restoreMember(){
    this.loading = true;
    await this.firebaseservice.deleteMember('archive','members', this.member)
    .then(() => {
      this.loading = false;
      const updatedMemberData = this.member.toJSON();
      this.dialogRef.close(updatedMemberData);
      this.router.navigate(['/archive']);
    })
    .catch(
      (err) => { console.error(err); }
    );
}
}
