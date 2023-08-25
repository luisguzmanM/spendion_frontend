import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL: string = 'https://side-project01-backend.onrender.com/api/v1/dashboard';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getAllDataUser(id:number):Observable<any>{
    return this._httpClient.get<any>(`${this.API_URL}/${id}`)
  }

}
