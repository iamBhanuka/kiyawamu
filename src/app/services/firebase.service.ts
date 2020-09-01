import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public firestore: AngularFirestore) {}

  createUser(value): any {
    return this.firestore.collection('users').add(value);
  }

  getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .snapshotChanges()
        .subscribe((snapshot) => resolve(snapshot));
    });
  }

  getUserStream() {
    return this.firestore.collection('users').snapshotChanges();
  }
}
