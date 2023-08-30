import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL_LOCAL: string = API_URL_LOCAL + '/dashboard';

  constructor(
    private _httpClient: HttpClient
  ) { }

  createCategory(payload:any):Observable<any>{
    return this._httpClient.post<any>(`${this.URL_LOCAL}/createCategory`, payload);
  }

  deleteCategory(payload:any):Observable<any>{
    const params = new HttpParams()
      .append('token', payload.token)
      .append('id_category', payload.id_category)
    return this._httpClient.delete<any>(`${this.URL_LOCAL}/deleteCategory`, { params: params });
  }

  addNewExpense(payload:any):Observable<any>{
    return this._httpClient.put<any>(`${this.URL_LOCAL}/addNewExpense`, payload)
  }

}
