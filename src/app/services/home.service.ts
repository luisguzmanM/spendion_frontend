import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_URL_LOCAL, API_URL_PRODUCTION } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URL_PRODUCTION: string = API_URL_PRODUCTION + '';
  URL_LOCAL: string = API_URL_LOCAL + '/home';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getBudgets(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this._httpClient.get(`${this.URL_LOCAL}`, { params: params });
  }

}
