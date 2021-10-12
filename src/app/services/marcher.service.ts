import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marcher } from '../modele/marcher.model';

const baseUrl = 'http://localhost:8000';
const httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class MarcherService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Marcher[]> {
    return this.http.get<Marcher[]>(baseUrl + '/marchers/',
    {headers: httpHeaders});
  }

  get(id: any): Observable<Marcher> {
    return this.http.get(baseUrl + '/marchers/' + id + '/',
    {headers: httpHeaders});
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/marchers/', data,
    {headers: httpHeaders});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/marchers/' + id + '/', data,
    {headers: httpHeaders});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl + '/marchers/' + id + '/',
    {headers: httpHeaders});
  }

}

