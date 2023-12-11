import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { FirebaseService } from '../firebase-service/firebase.service';
import { DialogAddMemberComponent } from '../dialog-add-member/dialog-add-member.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  subMemberList;

  constructor(public dialog: MatDialog, public firebaseservice: FirebaseService) {
    this.subMemberList = this.firebaseservice.subMemberList();
    console.log(this.firebaseservice.issueFilter);

  }

  filter() {
    this.firebaseservice.issueFilter = true;
    this.subMemberList = this.firebaseservice.subMemberList();
  }

  unfilter() {
    this.firebaseservice.issueFilter = false;
    this.subMemberList = this.firebaseservice.subMemberList();
  }

  openDialogue() {
    this.dialog.open(DialogAddMemberComponent);
  }

}
