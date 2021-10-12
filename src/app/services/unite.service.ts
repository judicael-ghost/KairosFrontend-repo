import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unite } from '../modele/unite.model';

const baseUrl = 'http://localhost:8000';
const httpHeaders = new HttpHeaders({'Content-type': 'application/json'});



@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Unite[]> {
    return this.http.get<Unite[]>(baseUrl + '/unites/',
    {headers: httpHeaders});
  }

  get(id: any): Observable<Unite> {
    return this.http.get(baseUrl + '/unites/' + id + '/',
    {headers: httpHeaders});
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/unites/', data,
    {headers: httpHeaders});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/unites/' + id + '/', data,
    {headers: httpHeaders});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl + '/unites/' + id + '/',
    {headers: httpHeaders});
  }

}
