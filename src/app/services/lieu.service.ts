import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lieu } from '../modele/lieu.model';

const baseUrl = 'http://localhost:8000';
const httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<Lieu[]> {
      return this.http.get<Lieu[]>(baseUrl + '/lieux/',
      {headers: httpHeaders});
    }

    get(id: any): Observable<Lieu> {
      return this.http.get(baseUrl + '/lieux/' + id + '/',
      {headers: httpHeaders});
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrl + '/lieux/', data,
      {headers: httpHeaders});
    }

    update(id: any, data: any): Observable<any> {
      return this.http.put(baseUrl + '/lieux/' + id + '/', data,
      {headers: httpHeaders});
    }

    delete(id: any): Observable<any> {
      return this.http.delete(baseUrl + '/lieux/' + id + '/',
      {headers: httpHeaders});
    }

  }

