import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { getDoc } from '@angular/fire/firestore';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditNotesComponent } from '../dialog-edit-notes/dialog-edit-notes.component';
import { DialogEditLevelComponent } from '../dialog-edit-level/dialog-edit-level.component';
import { DialogArchiveComponent } from '../dialog-archive/dialog-archive.component';
import { Member } from 'src/models/member.class';
import { DialogEditMemberComponent } from '../dialog-edit-member/dialog-edit-member.component';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent {
  activeId!: string;
  member!:Member;
  value!:number;
  formattedDate!:string;

  constructor(public firebaseservice: FirebaseService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1];
      this.activeId = lastSegment.toString();
    });
    this.fetchSingleMember();
  }

  async fetchSingleMember() {
    const docRef = this.firebaseservice.getSingleRef('members', this.activeId);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const memberData = docSnapshot.data();
        this.member = new Member(memberData);
        this.formattedDate = this.firebaseservice.getFormattedDatefromTimestamp(this.member.birthDate);
        let level = this.member.level as number;
        this.value = level * 10;
      } else {
        console.log('Dokument nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Dokuments:', error);
    }
  }
  

  openEditMemberDialog() {
    const dialog = this.dialog.open(DialogEditMemberComponent);
    dialog.afterClosed().subscribe((updatedMemberData) => {
      if (updatedMemberData) {
        this.member = new Member(updatedMemberData);
      }
    });
    dialog.componentInstance.member = new Member(this.member.toJSON());
    dialog.componentInstance.formattedDate = this.formattedDate;
  }


  openEditAddressDialog() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.afterClosed().subscribe((updatedMemberData) => {
      if (updatedMemberData) {
        this.member = new Member(updatedMemberData);
      }
    });
    dialog.componentInstance.member = new Member(this.member.toJSON());
  }

  openArchiveDialog() {
    const dialog = this.dialog.open(DialogArchiveComponent);
    dialog.afterClosed().subscribe((updatedMemberData) => {
      if (updatedMemberData) {
        this.member = new Member(updatedMemberData);
      }
    });
    dialog.componentInstance.member = new Member(this.member.toJSON());
  }

  openEditNotesDialog() {
    const dialog = this.dialog.open(DialogEditNotesComponent);
    dialog.afterClosed().subscribe((updatedMemberData) => {
      if (updatedMemberData) {
        this.member = new Member(updatedMemberData);
      }
    });
    dialog.componentInstance.member = new Member(this.member.toJSON());
  }

  openEditLevelDialog() {
    const dialog = this.dialog.open(DialogEditLevelComponent);
    dialog.afterClosed().subscribe((updatedMemberData) => {
      if (updatedMemberData) {
        this.member = new Member(updatedMemberData);
        let level = this.member.level as number;
        this.value = level * 10;
      }
    });
    dialog.componentInstance.member = new Member(this.member.toJSON());
  }
}
