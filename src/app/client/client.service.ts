import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeService } from '../commande/commande.service';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient , private api: CommandeService) { }

  countClient(): Observable<any>{
    return this.http.get(this.baseurl+ '/clients/',
    {headers : this.httpHeaders});
  }
  getAllClient(): Observable<any>{
    return this.http.get(this.baseurl+ '/clients/',
    {headers : this.httpHeaders});
  }
  getOneClient(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/clients/' + id +'/',
    {headers : this.httpHeaders});
  }
  deleteClient(id:any): Observable<any>{
    return this.http.delete(this.baseurl+ '/clients/' + id +'/',
    {headers : this.httpHeaders});
  }
  updateClient(clients:any): Observable<any>{
    const body = {nom : clients.nom, prenom : clients.prenom, adresse : clients.adresse, tel : clients.tel};
    return this.http.put(this.baseurl+ '/clients/' + clients.id +'/', body ,{headers : this.httpHeaders});
  }

  updateClientBonus(clients:any , bonus:any): Observable<any>{
    const body = {point : bonus};
    return this.http.put(this.baseurl+ '/clients/' + clients.id +'/', body ,{headers : this.httpHeaders});
  }

  updateBonus(clients:any , bonus:any): Observable<any>{
    const body = {bonus : bonus};
    return this.http.put(this.baseurl+ '/clients/' + clients.id +'/', body ,{headers : this.httpHeaders});
  }

  ajoutClient(clients:any , bonus : any): Observable<any>{
    const body = {nom : clients.nom, prenom : clients.prenom, adresse : clients.adresse, tel : clients.tel, point : bonus};
    return this.http.post(this.baseurl+ '/clients/' , body ,{headers : this.httpHeaders});
  }
  getAllCommandeClient(nom:any, tel:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandesClient/?nom='+ nom +'&tel='+ tel,
    {headers : this.httpHeaders});
  }

  countAllCommandeClient(nom:any, tel:any , categorie:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandesClient/?nom='+ nom +'&tel='+ tel +'&categorie='+ categorie,
    {headers : this.httpHeaders});
  }
}
