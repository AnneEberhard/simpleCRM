import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loading: boolean = false;
  password:string;

  currentUser:string;

  constructor(private router: Router,private firebaseservice: FirebaseService) { }
  
  async ngOnInit() {
    await this.firebaseservice.subUserList();
    console.log(this.firebaseservice.userList);
  }

  login() {
    if (this.email.invalid) {
      console.log('Ungültige E-Mail-Adresse');
      return;
    } else {
      const enteredEmail = this.email.value;
      for (const user of this.firebaseservice.userList) {
        if (user.email === enteredEmail) {
          const enteredPassword = this.password;
          if (enteredPassword === user.password) {
            console.log('Anmeldung erfolgreich');
            this.firebaseservice.loggedIn = true;
            this.firebaseservice.currentUser = user.name;
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Falsches Passwort');
          }
          return; 
        }
      }
      console.log('E-Mail nicht gefunden');
  }

}
}
