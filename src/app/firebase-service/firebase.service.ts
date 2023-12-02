import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc, limit, query, onSnapshot, QueryDocumentSnapshot, DocumentSnapshot, getDoc } from '@angular/fire/firestore';
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
    return onSnapshot(q, (querySnapshot) => {
      this.userList = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const docId = doc.id;
        const userData = doc.data();
        const userWithId = { ...userData, id: docId };
        this.userList.push(userWithId);
      }
      )
    })
  }

  async fetchSingleUser(activeId: string): Promise<User> {
    const docRef = this.getSingleUserRef('users', activeId);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data() as User;
        return userData;
      } else {
        console.log('Dokument nicht gefunden.');
        throw new Error('Dokument nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Dokuments:', error);
      throw new Error('Fehler beim Abrufen des Dokuments.');
    }
  }

 //async deleteUser(UserId: string) {
  //collectionId = 'users';
 //  await deleteDoc(this.getSingleUserRef(collectionId, documentID)).catch(
 //    (err) => { console.error(err) }
 //  );
 //}

  async updateNote(user: User) {
    if (user.firstName) { //ID war optional, deshalb die if, sonst gibt es Fehler
      let docRef = this.getSingleUserRef('users', user.firstName);
      await updateDoc(docRef, this.getCleanJSON(user)).catch(
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

  ngonDestroy() {
    this.unsubUserList(); //beendet das alles wieder
  }





  getCleanJSON(obj: User) { //um mein JSON aufzuräumen für bestimmte Funktionen
    return {
      firstName: obj.firstName || '',
      lastName: obj.lastName|| '',
      birthDate: obj.birthDate || '',
      address: obj.address || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
      email: obj.email || ''
    }
  }
}
