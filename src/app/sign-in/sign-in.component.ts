import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loading: boolean = false;
  password: string;
  passwordAlert: boolean = false;
  emailAlert: boolean = false;

  constructor(private router: Router, private firebaseservice: FirebaseService, private authservice: AuthService) { }

  async ngOnInit() {
    
  }

  login() {
    if (this.email.invalid) {
      this.emailAlert = true;
      return;
    } else {
      this.emailAlert = false;
    }
    const email = this.email.value;
    const password = this.password;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.passwordAlert = true;
      });
  }


}
