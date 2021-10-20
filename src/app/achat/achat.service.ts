import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/',
    {headers : this.httpHeaders});
  }
}
