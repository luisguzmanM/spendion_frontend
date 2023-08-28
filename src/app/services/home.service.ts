import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_URL_LOCAL, API_URL_PRODUCTION } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URL_PRODUCTION: string = API_URL_PRODUCTION + '/dashboard';
  URL_LOCAL: string = API_URL_LOCAL + '/dashboard';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getAllDataUser(email: string): Observable<any> {
    const params = new HttpParams().append('email', email);
    return this._httpClient.get<any>(`${this.URL_LOCAL}`, { params: params });
  }

}
