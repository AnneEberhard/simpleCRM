import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  firestore: Firestore = inject(Firestore);

  constructor() { }


}
