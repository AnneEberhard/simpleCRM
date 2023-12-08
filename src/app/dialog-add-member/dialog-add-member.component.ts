import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../firebase-service/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/models/member.class';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.scss']
})
export class DialogAddMemberComponent {
  member = new Member();
  birthDate!: Date;
  loading: boolean = false;
  memberForm!: FormGroup;


  constructor(private fb: FormBuilder, private firestore: Firestore, private firebaseservice: FirebaseService, public dialogRef: MatDialogRef<DialogAddMemberComponent>) { }

  ngOnInit() {
    this.memberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      address: [''],
      zipCode: [''],
      city: ['']
    });
  }


  async saveMember() {
    if (this.memberForm.valid) {
      this.loading = true;
      debugger;
      const memberData = this.returnFormData();
      const newMember = new Member(memberData);

      let docRef = this.firebaseservice.getRef('members');
      await addDoc(docRef, newMember.toJSON())
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
      id: this.memberForm.value.id,
      firstName: this.memberForm.value.firstName,
      lastName: this.memberForm.value.lastName,
      email: this.memberForm.value.email,
      birthDate: this.memberForm.value.birthDate.getTime(),
      address: this.memberForm.value.address,
      zipCode: this.memberForm.value.zipCode,
      city: this.memberForm.value.city,
    };
  }
}
