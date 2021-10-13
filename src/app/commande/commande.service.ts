import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jsPDF} from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  baseurl: "http://127.0.0.1:8000"
  baseUrl: "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getAllCategorie(): Observable<any>{
    return this.http.get(this.baseurl+ '/categorie/',
    {headers : this.httpHeaders});
  }

  getProduit(categorie:any): Observable<any>{
    return this.http.get(this.baseurl+ '/ajoutproduits/?categorie='+ categorie,
    {headers : this.httpHeaders});
  }

  getTable(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/tables/?id='+ id,
    {headers : this.httpHeaders});
  }

  geCommande(): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/',
    {headers : this.httpHeaders});
  }

  geCommandeClient(): Observable<any>{
    return this.http.get(this.baseurl+ '/commandesClient/',
    {headers : this.httpHeaders});
  }

  IngreMoins(produit:any, date : any, facture:any): Observable<any>{
    const body = {
      produit : produit.id,
      nom : produit.nom,
      categorie : produit.categorie,
      prix : produit.prix,
      quantite : produit.quantite,
      net : produit.net,
      date : date,
      facture : facture
    };
    return this.http.post(this.baseurl+ '/ingredientmoins' , body ,
    {headers : this.httpHeaders});
  }



  ajoutCommande(produit:any, date : any, facture:any): Observable<any>{
    const body = {
      nom : produit.nom,
      categorie : produit.categorie,
      prix : produit.prix,
      quantite : produit.quantite,
      net : produit.net,
      date : date,
      facture : facture
    };
    return this.http.post(this.baseurl+ '/commandes/' , body ,
    {headers : this.httpHeaders});
  }

  ajoutCommandeClient(produit:any, client:any, date : any): Observable<any>{
    const body = {
      tel : client.tel,
      nom : client.nom,
      prenom : client.prenom,
      nomPro : produit.nom,
      categorie : produit.categorie,
      prix : produit.prix,
      quantite : produit.quantite,
      net : produit.net,
      date : date
    };
    return this.http.post(this.baseurl+ '/commandesClient/' , body ,
    {headers : this.httpHeaders});
  }

  ajoutFacture(commande:any): Observable<any>{
    const body = {
      heureFatcure : commande.heure,
      dateFacture : commande.date,
      total : commande.total,
      billet : commande.billet,
      rendu : commande.rendu
    };
    return this.http.post(this.baseurl+ '/factures/' , body ,
    {headers : this.httpHeaders});
  }

  getFacture(): Observable<any>{
    return this.http.get(this.baseurl+ '/factures/',
    {headers : this.httpHeaders});
  }
  getOneFacture(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/?facture='+id,
    {headers : this.httpHeaders});
  }
  getFactureDate(date:any): Observable<any>{
    return this.http.get(this.baseurl+ '/factures/?dateFacture='+date,
    {headers : this.httpHeaders});
  }

  print(contenu){
    let pdf = new jsPDF('p' , 'pt' , 'a7');
    pdf.html(contenu , {
      callback : (pdf) => {
        pdf.output('dataurlnewwindow')
      }
    })
  }
}
