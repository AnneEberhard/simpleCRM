import { Component } from '@angular/core';
import { FirebaseService } from './firebase-service/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router, public firebaseservice: FirebaseService) {}

  title = 'simple-crm';

}
