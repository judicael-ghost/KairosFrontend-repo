import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"

    LOGIN_URL = "http://localhost:8000/" + 'api/login/';
    LOGOUT_URL = "http://localhost:8000/" + 'api/logout/';
    UTULISATEUR_URL = "http://localhost:8000/" + 'utilisateur/';

    constructor(private httpclient: HttpClient, private router: Router){}


    login(pUsername: string, pPassword: string): Observable<any>{
        const userObject = {
            username: pUsername,
            password: pPassword
        }
        return this.httpclient.post(this.LOGIN_URL, userObject, {withCredentials: true});
    }

    getUtilisateur(): Observable<any> {
        return this.httpclient.get(this.UTULISATEUR_URL, {withCredentials : true});
    }

    logout(): Observable<any>{
        return this.httpclient.post(this.LOGOUT_URL, {}, {withCredentials : true});
    }

}
