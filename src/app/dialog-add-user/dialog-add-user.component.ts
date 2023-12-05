import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../firebase-service/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  loading: boolean = false;
  userForm!: FormGroup;


  constructor(private fb: FormBuilder, private firestore: Firestore, private firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      address: [''],
      zipCode: [''],
      city: ['']
    });
  }


  async saveUser() {

    if (this.userForm.valid) {
      this.loading = true;
      const userData = this.returnFormData();
      const newUser = new User(userData);

      let docRef = this.firebaseservice.getUsersRef('users');
      await addDoc(docRef, newUser.toJSON())
        .then(() => {
          this.loading = false;
          this.dialogRef.close();
        })
        .catch(
          (err) => { console.error(err); }
        );
    }
  }

  returnFormData() {
    return {
      id: this.userForm.value.id,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      birthDate: this.userForm.value.birthDate.getTime(),
      address: this.userForm.value.address,
      zipCode: this.userForm.value.zipCode,
      city: this.userForm.value.city,
    };
  }
}
