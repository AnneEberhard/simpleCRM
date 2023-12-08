import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getDoc } from '@angular/fire/firestore';
import { Member } from 'src/models/member.class';
import { DialogRestoreMemberComponent } from '../dialog-restore-member/dialog-restore-member.component';

@Component({
  selector: 'app-archived-member-detail',
  templateUrl: './archived-member-detail.component.html',
  styleUrls: ['./archived-member-detail.component.scss']
})
export class ArchivedMemberDetailComponent {
  activeId!: string;
  member!: Member;
  value!: number;

  constructor(public firebaseservice: FirebaseService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1];
      this.activeId = lastSegment.toString();
    });
    this.fetchSingleMember();
  }

  async fetchSingleMember() {
    const docRef = this.firebaseservice.getSingleRef('archive', this.activeId);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const memberData = docSnapshot.data() as Member;
        this.member = new Member(memberData);
        let level = this.member.level as number;
        this.value = level * 10;
      } else {
        console.log('Dokument nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Dokuments:', error);
    }
    console.log('this.member.id', this.member.id);
    console.log('this.activeId', this.activeId)
  }

openRestoreDialog() {
  const dialog = this.dialog.open(DialogRestoreMemberComponent);
  dialog.afterClosed().subscribe((updatedMemberData) => {
    if (updatedMemberData) {
      this.member = new Member(updatedMemberData);
    }
  });
  dialog.componentInstance.member = new Member(this.member.toJSON());
}
}
