import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc, limit, query, onSnapshot, QueryDocumentSnapshot, DocumentSnapshot, getDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Member } from 'src/models/member.class';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userList: any = [];
  memberList: any = [];
  archiveList: any = [];
  archiveCount: number = 0;


  constructor(private firestore: Firestore,) {
  
  }



  async deleteMember(oldCollectionId: string, newCollectionId: string, member: Member) {
    let memberId = member.id as string;
    member.id = '';
    let docRef = this.getRef(newCollectionId);
    await addDoc(docRef, member.toJSON());
    await deleteDoc(this.getSingleRef(oldCollectionId, memberId)).catch(
      (err) => { console.error(err) }
    );
  }

  async updateMember(collectionId: string, member: Member) {
    if (member.id) {
      let docRef = this.getSingleRef(collectionId, member.id);
      await updateDoc(docRef, member.toJSON()).catch(
        (err) => { console.error(err); } //
      );
    }
  }

  async updateUser(collectionId: string, user: User) {
    if (user.id) {
      let docRef = this.getSingleRef(collectionId, user.id);
      await updateDoc(docRef, user.toJSON()).catch(
        (err) => { console.error(err); } //
      );
    }
  }

  getRef(collectionId: string) {
    return collection(this.firestore, collectionId);
  }


  getSingleRef(collectionId: string, memberId: string) {
    return doc(collection(this.firestore, collectionId), memberId)
  }

  getFormattedDatefromTimestamp(unixTimestamp: number): string {
    let unformattedDate = new Date(unixTimestamp);
    let formattedDate = unformattedDate.toLocaleDateString();
    return formattedDate;
  }

  subMemberList(): Promise<void> {
    const q = query(this.getRef('members'), limit(100));
    return new Promise<void>((resolve, reject) => {
      onSnapshot(q, (querySnapshot) => {
        this.memberList = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docId = doc.id;
          const memberData = doc.data();
          const member = new Member(memberData);
          member.id = docId;
          this.memberList.push(member);
          this.updateMember('members', member);
        });
        resolve();
      }, reject);
    });
  }

  subarchiveList(): Promise<void> {
    const q = query(this.getRef('archive'), limit(100));
    return new Promise<void>((resolve, reject) => {
      onSnapshot(q, (querySnapshot) => {
        this.archiveList = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docId = doc.id;
          const memberData = doc.data();
          const member = new Member(memberData);
          member.id = docId;
          this.archiveList.push(member);
          this.updateMember('archive', member);
        });
        this.archiveCount = this.archiveList.length;
        resolve();
      }, reject);
    });
  }

  subUserList(): Promise<void> {
    const q = query(this.getRef('users'), limit(100));
    return new Promise<void>((resolve, reject) => {
      onSnapshot(q, (querySnapshot) => {
        this.userList = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docId = doc.id;
          const userData = doc.data();
          const user = new User(userData);
          user.id = docId;
          this.userList.push(user);
          this.updateUser('users', user);
        });
        this.archiveCount = this.archiveList.length;
        resolve();
      }, reject);
    });
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
