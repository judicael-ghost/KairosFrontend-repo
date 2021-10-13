import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Commande from '../modele/commande.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  baseurl: "http://127.0.0.1:8000"
  baseUrl: "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  private dbPath = 'admin';

  commandeRef: AngularFirestoreCollection<Commande>;

  constructor(private http: HttpClient , private db: AngularFirestore) {
    this.commandeRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Commande> {
    return this.commandeRef;
  }

  getAllTable(): Observable<any>{
    return this.http.get(this.baseurl+ '/tables/',
    {headers : this.httpHeaders});
  }

  getOneTable(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/tables/' + id +'/',
    {headers : this.httpHeaders});
  }

  deleteTable(id:any): Observable<any>{
    return this.http.delete(this.baseurl+ '/tables/' + id +'/',
    {headers : this.httpHeaders});
  }

  ajoutTable(table:any): Observable<any>{
    const body = {nom : table.nom};
    return this.http.post(this.baseurl+ '/tables/' , body ,{headers : this.httpHeaders});
  }

  updateTable(table:any): Observable<any>{
    const body = {nom : table.nom};
    return this.http.put(this.baseurl+ '/tables/'+ table.id +'/' , body ,{headers : this.httpHeaders});
  }

  totalCommande(date:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/?date='+ date ,
    {headers : this.httpHeaders});
  }


}
