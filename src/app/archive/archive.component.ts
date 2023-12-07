import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  user = new User();
  userList: any = [];

  unsubArchiveList;
  
  constructor(public firebaseservice: FirebaseService) { 
    this.unsubArchiveList = this.firebaseservice.subarchiveList();
   }


}
