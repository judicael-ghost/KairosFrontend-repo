import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historique } from '../modele/historique.model';

const baseUrl = 'http://localhost:8000';
const httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class HistoriqueAchatService {

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get<any[]>(baseUrl + '/historiques/',
    {headers: httpHeaders});
  }

  getDepense(): Observable<any> {
    return this.http.get<any[]>(baseUrl + '/depenses',
    {headers: httpHeaders});
  }


  getAll(): Observable<Historique[]> {
    return this.http.get<Historique[]>(baseUrl + '/historiques/',
    {headers: httpHeaders});
  }

  get(id: any): Observable<any> {
    return this.http.get(baseUrl + '/historiques/' + id + '/',
    {headers: httpHeaders});
  }

}
