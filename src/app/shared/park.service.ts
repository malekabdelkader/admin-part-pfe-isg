import { Injectable } from '@angular/core';
import { Park } from './Park';  // Park data telephone interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class ParkService {

  ParksRef: AngularFireList<any>;    // Reference to Park data list, its an Observable
  ParkRef: AngularFireObject<any>;   // Reference to Park object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Park
  AjouterPark(Park: Park) {
    this.ParksRef.push({
      titre: Park.titre,
      capacite: Park.capacite,
      adresse: Park.adresse,
    
    })
  }
  ModifierPark(Park: Park) {
    this.ParkRef.update({
        titre: Park.titre,
        capacite: Park.capacite,
        adresse: Park.adresse,
 


    })
  }
  // Fetch Single Park Object
  GetPark(id: string) {
    this.ParkRef = this.db.object('Parks/' + id);
    return this.ParkRef;
  }

  // Fetch Listes Parks
  GetParksList() {
    this.ParksRef = this.db.list('Parks');
    return this.ParksRef;
  }

  // Update Park Object

  // Delete Park Object
  SupprimerPark(id: string) {
    this.ParkRef = this.db.object('Parks/' + id);
    this.ParkRef.remove();
  }

}
