import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, updateDoc, limit, query, onSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userList: any = [];

  unsubUserList;

  constructor(private firestore: Firestore,) {
    this.unsubUserList = this.subUserList();
  }

  subUserList() {
    const q = query(this.getUsersRef(), limit(100));
    return onSnapshot(q, (list) => {
      this.userList = [];
      list.forEach(element => {
        console.log(element);
        this.userList.push((element.data()));
        console.log(this.userList);
      }
      )
    })
  }



  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleUserRef(collectionID: string, documentID: string) {
    return doc(collection(this.firestore, collectionID), documentID)
  }

  ngonDestroy() {
    this.unsubUserList(); //beendet das alles wieder
  }

}
