import { Component } from '@angular/core';
import { FirebaseService } from './firebase-service/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isBigScreen: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, private router: Router, public firebaseservice: FirebaseService) {}

  title = 'simple-crm';

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe(result => {
        if(result.matches) {
          this.isBigScreen = false;
        } else {
          this.isBigScreen = true;
        }
      });
  }

}
