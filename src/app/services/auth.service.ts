import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = 'https://side-project01-backend.onrender.com/api/v1/auth';

  constructor(
    private _httpClient : HttpClient
  ) { }

  signup(payload:NewUser):Observable<any>{
    return this._httpClient.post<any>(`${this.API_URL}/signup`, payload)
  }

  login(payload:User):Observable<any>{
    return this._httpClient.post<any>(`${this.API_URL}/login`, payload)
  }
}
