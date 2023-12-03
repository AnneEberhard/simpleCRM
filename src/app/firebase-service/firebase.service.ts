import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc, limit, query, onSnapshot, QueryDocumentSnapshot, DocumentSnapshot, getDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userList: any = [];

  constructor(private firestore: Firestore,) { }
 
 //async deleteUser(UserId: string) {
  //collectionId = 'users';
 //  await deleteDoc(this.getSingleUserRef(collectionId, documentID)).catch(
 //    (err) => { console.error(err) }
 //  );
 //}

  async updateUser(collectionId: string, user: User) {
    if (user.id) { //ID war optional, deshalb die if, sonst gibt es Fehler
      let docRef = this.getSingleUserRef(collectionId, user.id);
      await updateDoc(docRef, user.toJSON()).catch(
        (err) => { console.error(err); } //um Fehler abzufangen
      );
    }
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleUserRef(collectionID: string, userId: string) {
    return doc(collection(this.firestore, collectionID), userId)
  }


}
