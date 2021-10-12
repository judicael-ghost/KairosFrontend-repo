import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitDetailService {

  baseurl = environment.baseurl;
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
