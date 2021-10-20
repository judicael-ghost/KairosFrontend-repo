import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jsPDF} from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class AccueilService {
  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  totalDepense(): Observable<any>{
    return this.http.get(this.baseurl+ '/totaldepense',
    {headers : this.httpHeaders});
  }
}
