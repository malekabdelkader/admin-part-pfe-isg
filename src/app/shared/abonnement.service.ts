import { Injectable } from '@angular/core';
import { Abonnement } from './Abonnement';  // Abonnement data telephone interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  AbonnementsRef: AngularFireList<any>;    // Reference to Abonnement data list, its an Observable
  AbonnementRef: AngularFireObject<any>;   // Reference to Abonnement object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Abonnement
  AjouterAbonnement(Abonnement: Abonnement) {
    this.AbonnementsRef.push({
      mode: Abonnement.mode,
      code: Abonnement.code,
      expiration: Abonnement.expiration,
      email: Abonnement.email,
      etat: Abonnement.etat


    })
  }

  // Fetch Single Abonnement Object
  GetAbonnement(id: string) {
    this.AbonnementRef = this.db.object('Abonnements/' + id);
    return this.AbonnementRef;
  }

  // Fetch Listes Abonnements
  GetAbonnementsList() {
    this.AbonnementsRef = this.db.list('Abonnements');
    return this.AbonnementsRef;
  }

  // Update Abonnement Object

  // Delete Abonnement Object
  SupprimerAbonnement(id: string) {
    this.AbonnementRef = this.db.object('Abonnements/' + id);
    this.AbonnementRef.remove();
  }

}
