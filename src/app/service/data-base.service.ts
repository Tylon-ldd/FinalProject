import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: "root"
})
export class DataBaseService {
  endpoint = "businessCards";

  constructor( private db: AngularFirestore ) { }

  getBusinessCards() {
    return this.db.collection(this.endpoint).snapshotChanges();
  }

  getBusinessCard(id: string) {
    return this.db.collection(this.endpoint).doc(id).snapshotChanges();
  }

  createBusinessCard(card) {
    return this.db.collection(this.endpoint).add(card);
  }

  //not great, need to test and fix later
  updateBusinessCard(id: string, card) {
    return this.db
      .collection(this.endpoint)
      .doc(id)
      .set(card, { merge: true });
  }

  deleteBusinessCard(id: string) {
    return this.db
      .collection(this.endpoint)
      .doc(id)
      .delete();
  }
}
