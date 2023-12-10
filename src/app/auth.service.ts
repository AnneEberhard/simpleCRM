import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState, idToken, user, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
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

  displayName: string = '';
  isLoggedIn: boolean = false;


  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => { })
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
        } else {
          this.isLoggedIn = false;
          console.log(this.isLoggedIn);
        }
      });
    })}

  setDisplayName(name: string) {
      this.displayName = name;
    }

  getDisplayName(): string {
      return this.displayName;
    }

 

  logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        setTimeout(() => {
          this.isLoggedIn = false;
          this.displayName = '';
        }, 500);
      }).catch((error) => {
      });
      this.router.navigate(['/sign-in']);
    }



  getAuthState() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if(user) {
        let userName = user.displayName;
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
  }
}
