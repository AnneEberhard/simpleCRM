import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.class';

@Component({
  selector: 'app-dialog-archive',
  templateUrl: './dialog-archive.component.html',
  styleUrls: ['./dialog-archive.component.scss']
})
export class DialogArchiveComponent {
  member!: Member;

  loading: boolean = false;

  constructor(public firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogArchiveComponent>, private router: Router) { }

  async archiveMember(){
    this.loading = true;
    await this.firebaseservice.deleteMember('members', 'archive', this.member)
    .then(() => {
      this.loading = false; 
      const updatedMemberData = this.member.toJSON();
      this.dialogRef.close(updatedMemberData);
      this.router.navigate(['/member']);
    })
    .catch(
      (err) => { console.error(err); }
    );
}
  }

