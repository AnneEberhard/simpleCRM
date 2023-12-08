import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Member } from 'src/models/member.class';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  member = new Member();
  memberList: any = [];

  unsubArchiveList;
  
  constructor(public firebaseservice: FirebaseService) { 
    this.unsubArchiveList = this.firebaseservice.subarchiveList();
   }


}
