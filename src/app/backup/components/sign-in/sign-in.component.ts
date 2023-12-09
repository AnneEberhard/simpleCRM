import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase-service/firebase.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from 'src/app/backup/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loading: boolean = false;

//Old
  constructor(public authService: AuthService, private firebaseservice: FirebaseService) { }

  ngOnInit(): void {

  }

}
