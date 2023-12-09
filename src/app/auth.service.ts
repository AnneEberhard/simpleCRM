import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, idToken, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription;


  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    })
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    })
    this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
      //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
      console.log(token);
    })
  
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
    this.idTokenSubscription.unsubscribe();
  }
}
