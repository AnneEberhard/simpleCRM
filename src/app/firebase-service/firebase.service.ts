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

  async deleteUser(newCollectionId: string, oldCollectionId: string, user: User) {
    let userId = user.id as string;
    let docRef = this.getUsersRef(oldCollectionId);
    await addDoc(docRef, user.toJSON());
    await deleteDoc(this.getSingleUserRef(newCollectionId, userId)).catch(
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

  getFormattedDatefromTimestamp(unixTimestamp: number): string {
    console.log ('unixTimestamp', unixTimestamp);
    let unformattedDate = new Date(unixTimestamp);
    console.log ('unformattedDate', unformattedDate);
    let formattedDate = unformattedDate.toLocaleDateString();
    console.log (formattedDate);
    return formattedDate;
  }

  // Methode zum Konvertieren von Unix-Zeitstempel (in Millisekunden) in ein Date-Objekt
  unixTimestampToDate(unixTimestamp: number): Date {
    return new Date(unixTimestamp);
  }

  // Methode zum Konvertieren von Date-Objekt in Unix-Zeitstempel (in Millisekunden)
  dateToUnixTimestamp(date: Date): number {
    return date.getTime();
  }

  // Methode zum Formatieren eines Date-Objekts als Zeichenkette
  getFormattedBirthDate(date: Date): string {
    return date.toLocaleDateString();
  }

}
