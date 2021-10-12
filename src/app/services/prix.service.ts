import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prix } from '../modele/prix.model';

const baseUrl = 'http://localhost:8000';
const httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class PrixService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Prix[]> {
    return this.http.get<Prix[]>(baseUrl + '/prix/',
    {headers: httpHeaders});
  }

  get(id: any): Observable<Prix> {
    return this.http.get(baseUrl + '/prix/' + id + '/',
    {headers: httpHeaders});
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/prix/', data,
    {headers: httpHeaders});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/prix/' + id + '/', data,
    {headers: httpHeaders});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl + '/prix/' + id + '/',
    {headers: httpHeaders});
  }

}
