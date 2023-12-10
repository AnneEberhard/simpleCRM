import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';
import { addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Auth, getAuth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  passwordValidation: string;
  password = new FormControl('', [Validators.required, Validators.minLength(7)]);
  hide: boolean = true;
  loading: boolean = false;
  user: User = new User();
  passwordAlert: boolean = false;

  constructor(private router: Router, private firebaseservice: FirebaseService, private authservice: AuthService) { }


  checkEmail() {
    if (this.email.invalid) {
      console.log('Ungültige E-Mail-Adresse');
      return false;
    } else {
      this.user.email = this.email.value;
      return true;
    }
  }

  checkPassword() {
    this.passwordAlert = false;
    if (this.password.invalid) {
      console.log('Passwort invalid');
      return false;
    } else {
      this.user.password = this.password.value;
      if (this.user.password === this.passwordValidation) {
        return true
      } else {
        this.passwordAlert = true;
        return false
      }
    }
  }

  createNewUser() {
    if (this.checkEmail()) {
      if (this.checkPassword()) {
        let email = this.user.email;
        let password = this.user.password;
        const auth = getAuth();
        let displayName = this.user.name;
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, { displayName: displayName });
          })
          .then(() => {
            this.authservice.setDisplayName(displayName);
            this.router.navigate(['/dashboard']);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      } 
    }
  }
}



