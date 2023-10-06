import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_URL_LOCAL, API_URL_PRODUCTION } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URL_PRODUCTION: string = API_URL_PRODUCTION + '/home';
  URL_LOCAL: string = API_URL_LOCAL + '/home';

  constructor(
    private _httpClient: HttpClient
  ) { }

  addIncome(payload:any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.post(`${this.URL_PRODUCTION}/addIncome`, payload, {headers: headers});
  }

  getIncome(token:any):Observable<any>{
    const params = new HttpParams().append('token', token);
    return this._httpClient.get<any>(`${this.URL_PRODUCTION}/getIncome`, { params: params });
  }

}
