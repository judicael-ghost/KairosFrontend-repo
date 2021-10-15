import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Commande from '../modele/commande.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  baseurl: "http://127.0.0.1:8000"
  baseUrl: "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  nbTest:any[] = [];
  display : boolean = false;
  userType : boolean;

  private dbPath = 'admin';

  //commandeRef: AngularFirestoreCollection<Commande>;

  constructor(private http: HttpClient) {
    //this.commandeRef = db.collection(this.dbPath);
  }

  // getAll(): AngularFirestoreCollection<Commande> {
  //   return this.commandeRef;
  // }

}
