import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {jsPDF} from 'jspdf'

@Injectable({
  providedIn: 'root'
})
export class AccueilService {
  baseurl = environment.baseurl;
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  totalDepense(): Observable<any>{
    return this.http.get(this.baseurl+ '/totaldepense',
    {headers : this.httpHeaders});
  }
}
