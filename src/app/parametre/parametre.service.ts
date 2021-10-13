import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  baseurl: "http://127.0.0.1:8000"
  baseUrl: "http://localhost:8000/"
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  UTILISATEUR_URL = "http://localhost:8000/"+"utilisateur/liste/";
  PROFILE_URL = "http://localhost:8000/"+"utilisateur/profile/";
  constructor(private http: HttpClient) { }

  getBonus(): Observable<any>{
    return this.http.get(this.baseurl+ '/bonus/',
    {headers : this.httpHeaders});
  }

  deleteBonus(id:any): Observable<any>{
    return this.http.delete(this.baseurl+ '/bonus/' + id +'/',
    {headers : this.httpHeaders});
  }

  getOneBonus(id:any): Observable<any>{
    return this.http.get(this.baseurl+ '/bonus/' + id +'/',
    {headers : this.httpHeaders});
  }

  ajoutBonus(bonus:any): Observable<any>{
    const body = {point : bonus.point , min : bonus.min , max : bonus.max};
    return this.http.post(this.baseurl+ '/bonus/' , body ,{headers : this.httpHeaders});
  }

  updateBonus(bonus:any): Observable<any>{
    const body = {point : bonus.point , min : bonus.min , max : bonus.max};
    return this.http.put(this.baseurl+ '/bonus/'+ bonus.id +'/' , body ,{headers : this.httpHeaders});
  }

  getUtilisateur(): Observable<any>{
    return this.http.get(this.UTILISATEUR_URL, {withCredentials:true});
  }

  getOnUtilisateur(id: any): Observable<any>{
    return this.http.get(this.UTILISATEUR_URL+id, {withCredentials:true});
  }

  ajoutUtilisateur(user:any): Observable<any>{
    const body = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      profile: user.profile
    }
    return this.http.post(this.UTILISATEUR_URL, body,{withCredentials:true});
  }

  modiffierUtilisateur(user:any): Observable<any> {
    const body = {username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password}
    return this.http.put(this.UTILISATEUR_URL+user.id+'/',body,{headers : this.httpHeaders})
  }

  supprimerUtilisateur(id: any): Observable<any> {
    return this.http.delete(this.UTILISATEUR_URL+id,{withCredentials:true});
  }
  // 0344948349

  getOneProfile(id:any): Observable<any> {
    return this.http.get(this.PROFILE_URL+id, {withCredentials:true})
  }

  ajoutProfile(profile:any): Observable<any>{
    const body = {
      accounts: profile.accounts,
      type: profile.type,
      telephone: profile.telephone,
      image: profile.image
    }
    return this.http.post(this.PROFILE_URL, body,{withCredentials:true});
  }

  updateProfile(profile:any): Observable<any>{
    const body = {accounts: profile.accounts, type: profile.type, telephone: profile.telephone, image: profile.image}
    return this.http.put(this.PROFILE_URL+profile.accounts+'/',body,{withCredentials:true});
  }
}
