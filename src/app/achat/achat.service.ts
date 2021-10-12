import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  baseurl = environment.baseurl;
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<any>{
    return this.http.get(this.baseurl+ '/commandes/',
    {headers : this.httpHeaders});
  }
}
