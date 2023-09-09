import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_URL_LOCAL, API_URL_PRODUCTION } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URL_PRODUCTION: string = API_URL_PRODUCTION + '';
  URL_LOCAL: string = API_URL_LOCAL + '/dashboard';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getBudgets(id: number): Observable<any> {
    return this._httpClient.get(`${this.URL_LOCAL}/${id.toString()}`);
  }

}
