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

  constructor(private router: Router, private firebaseservice: FirebaseService) { }

  createNewUser() {
    if (this.email.invalid) {
      console.log('Ungültige E-Mail-Adresse');
    } else {
      this.user.email = this.email.value;
      if (this.password.invalid) {
        console.log('Passwort invalid');
      } else {
        this.user.password = this.password.value;
        if (this.user.password === this.passwordValidation) {
          this.addUser();
          this.router.navigate(['/sign-in']);
        } else {
          console.log('Ihre Passwörter stimmen nicht überein');
        }
      }
    }
  }

  async addUser() {
    let docRef = this.firebaseservice.getRef('users');
    await addDoc(docRef, this.user.toJSON())
      .then(() => {
        this.loading = false;
        console.log('added', this.user)
      })
      .catch(
        (err) => { console.error(err); }
      );
  }

}



