import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const APIUrl = "http://127.0.0.1:8000";
const httpheaders = new HttpHeaders({'content-type':'application/json'})

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(private http:HttpClient) { }

  getRecList():Observable<any[]>{
    return this.http.get<any[]>(APIUrl + '/recettes/',{headers:httpheaders});
  }

  addRec(data:any):Observable<any>{
    return this.http.post(APIUrl + '/recettes/', data,{headers:httpheaders});
  }

  updateRec(id:any, data:any):Observable<any>{
    return this.http.put(APIUrl + '/recettes/' + id +'/', data,
    {headers:httpheaders});
  }

  deleteRec(val:any){
    return this.http.delete(APIUrl + '/recettes/'+val);
  }


  get(id:any):Observable<any>{
    return this.http.get(APIUrl + '/produites/'+ id,
    {headers:httpheaders});
  }

  getProduitRe(id:any):Observable<any>{
    return this.http.get(APIUrl + '/produiterecette/'+ id ,
    {headers:httpheaders});
  }


}
