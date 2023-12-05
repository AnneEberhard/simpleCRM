import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc, limit, query, onSnapshot, QueryDocumentSnapshot, DocumentSnapshot, getDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userList: any = [];
  archiveList: any = [];


  constructor(private firestore: Firestore,) { }

  async deleteUser(user: User) {
    let userId = user.id as string;
    let collectionId = 'users';
    let docRef = this.getUsersRef('archive');
    await addDoc(docRef, user.toJSON());
    await deleteDoc(this.getSingleUserRef(collectionId, userId)).catch(
      (err) => { console.error(err) }
    );
  }

  async updateUser(collectionId: string, user: User) {
    if (user.id) { //ID war optional, deshalb die if, sonst gibt es Fehler
      let docRef = this.getSingleUserRef(collectionId, user.id);
      await updateDoc(docRef, user.toJSON()).catch(
        (err) => { console.error(err); } //um Fehler abzufangen
      );
    }
  }

  getUsersRef(collectionId: string) {
    return collection(this.firestore, collectionId);
  }

  getSingleUserRef(collectionId: string, userId: string) {
    return doc(collection(this.firestore, collectionId), userId)
  }


}
