import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitDetailService {

  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getOneCategorie(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/categorie/' + id +'/',
    {headers : this.httpHeaders});
  }

  commandeParCategorie(categorie:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/?categorie='+ categorie,
    {headers : this.httpHeaders});
  }
  commandeParNomprod(nom:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/?nom='+ nom,
    {headers : this.httpHeaders});
  }
  commandeClientParCategorie(categorie:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandesClient/?categorie='+ categorie,
    {headers : this.httpHeaders});
  }
  commandeClientParNomprod(nom:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandesClient/?nomPro='+ nom,
    {headers : this.httpHeaders});
  }
}
