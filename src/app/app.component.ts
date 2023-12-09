import { Component } from '@angular/core';
import { AuthService } from './backup/shared/services/auth.service';
import { FirebaseService } from './firebase-service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router, public firebaseservice: FirebaseService) {}

  title = 'simple-crm';

  logout() {
    this.firebaseservice.loggedIn = false;
    this.firebaseservice.currentUser = 'X';
    localStorage.setItem('loggedIn', 'false'); 
    localStorage.setItem('currentUser', 'X');
    this.router.navigate(['/sign-in']);
  }
}
