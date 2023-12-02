import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, collectionData, onSnapshot} from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  user = new User();
  
  constructor(public dialog: MatDialog, public firebaseservice: FirebaseService) {  }

  ngOnInit(): void {
    this.firebaseservice.subUserList() 
    }


  openDialogue() {
    this.dialog.open(DialogAddUserComponent);
  }
}

