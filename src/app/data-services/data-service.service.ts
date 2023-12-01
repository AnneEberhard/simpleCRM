import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  firestore: Firestore = inject(Firestore);

  constructor() { }


  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleUserRef(collectionID: string, documentID: string) {
    return doc(collection(this.firestore, collectionID), documentID)
  }
}
