import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp , Login, SignUpResponse  } from '../models/auth.model';
import { API_URL_PRODUCTION, API_URL_LOCAL } from './../globals'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_PRODUCTION: string = API_URL_PRODUCTION + '/auth';
  URL_LOCAL: string = API_URL_LOCAL + '/auth';

  constructor(
    private _httpClient : HttpClient
  ) { }

  signup(payload:SignUp ):Observable<SignUpResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.post<SignUpResponse>(`${this.URL_LOCAL}/signup`, payload, {headers: headers})
  }

  login(payload:Login ):Observable<any>{
    return this._httpClient.post<any>(`${this.URL_LOCAL}/login`, payload)
  }
}
