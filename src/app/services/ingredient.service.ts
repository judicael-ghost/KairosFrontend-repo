import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpHeaders,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../modele/ingredient.model';

const baseUrl = 'http://localhost:8000';
const httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  upload(data: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${baseUrl}/ingredients/`, data, {
      //headers: httpHeaders,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/ingredients/`);
  }

  getliste(APIUrl: string): Observable<any> {
    return this.http.get<any>(APIUrl);
  }

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(baseUrl + '/ingredientsliste/',
    {headers: httpHeaders});
  }

  get(id: any): Observable<Ingredient> {
    return this.http.get(baseUrl + '/ingredients/' + id + '/',
    {headers: httpHeaders});
  }

  marcher(id: any): Observable<any> {
    return this.http.get(baseUrl + '/ingredients/' + id + '/trouver',
    {headers: httpHeaders});
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/ingredients/', data,
    {headers: httpHeaders});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/ingredients/' + id + '/', data,
    {headers: httpHeaders});
  }

  alerte(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/ingredients/' + id + '/parametre/', data,
    {headers: httpHeaders});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl + '/ingredients/' + id + '/',
    {headers: httpHeaders});
  }

  approvisionnement(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/ingredients/' + id + '/aprovisionnement/', data,
    {headers: httpHeaders});
  }

  don(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/ingredients/' + id + '/don/', data,
    {headers: httpHeaders});
  }

  getnotification(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(baseUrl + '/ingredientsInssufisante/',
    {headers: httpHeaders});
  }

  getStateAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(baseUrl + '/statistiques/',
    {headers: httpHeaders});
  }

  getStateIngre(id: any): Observable<Ingredient> {
    return this.http.get(baseUrl + '/statistiques/' + id + '/',
    {headers: httpHeaders});
  }

  simulation(data: any): Observable<any> {
    return this.http.put(baseUrl + '/simulation/' + data.id,data,
    {headers: httpHeaders});
  }

  viderIngre(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/ingredients/' + id + '/vider/', data,
    {headers: httpHeaders});
  }

}
