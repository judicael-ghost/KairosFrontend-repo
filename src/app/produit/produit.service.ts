import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<any>{
    return this.http.get(this.baseurl+'/commandes/',
    {headers : this.httpHeaders});
  }

  CommandeClient(): Observable<any>{
    return this.http.get(this.baseurl+'/commandesClient/',
    {headers : this.httpHeaders});
  }

  getProduit(): Observable<any>{
    return this.http.get(this.baseurl+'/ajoutproduits/',
    {headers : this.httpHeaders});
  }

  deleteProduit(id:any): Observable<any>{
    return this.http.delete(this.baseurl+'/produits/' + id +'/',
    {headers : this.httpHeaders});
  }

  deleteProduitCate(cate:any): Observable<any>{
    return this.http.get(this.baseurl+'/supprProduit/'+cate,
    {headers : this.httpHeaders});
  }

  getOneProduit(id:any): Observable<any>{
    return this.http.get(this.baseurl+'/ajoutproduits/' + id +'/',
    {headers : this.httpHeaders});
  }

  getCategorie(): Observable<any>{
    return this.http.get(this.baseurl+ '/categorie/',
    {headers : this.httpHeaders});
  }

  deleteCategorie(id:any): Observable<any>{
    return this.http.delete(this.baseurl+ '/categorie/' + id +'/',
    {headers : this.httpHeaders});
  }

  getOneCategorie(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/categorie/' + id +'/',
    {headers : this.httpHeaders});
  }

  ajoutCategorie(categorie:any): Observable<any>{
    const body = {nomCate : categorie.nom};
    return this.http.post(this.baseurl+ '/categorie/' , body ,{headers : this.httpHeaders});
  }

  updateCategorie(categorie:any): Observable<any>{
    const body = {nom : categorie.nom};
    return this.http.put(this.baseurl+ '/categorie/'+ categorie.id +'/' , body ,{headers : this.httpHeaders});
  }
}
