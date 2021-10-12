import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    LOGIN_URL = environment.baseUrl + 'api/login/';
    LOGOUT_URL = environment.baseUrl + 'api/logout/';
    UTULISATEUR_URL = environment.baseUrl + 'utilisateur/';

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
