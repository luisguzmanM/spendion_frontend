import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  URL_LOCAL: string = API_URL_LOCAL + '/dashboard';

  constructor(
    private _httpClient: HttpClient
  ) { }

  createBudget(payload:any):Observable<any>{
    return this._httpClient.post<any>(`${this.URL_LOCAL}/createBudget`, payload);
  }

  deleteBudget(payload:any):Observable<any>{
    const params = new HttpParams()
      .append('token', payload.token)
      .append('id_budget', payload.id_budget)
    return this._httpClient.delete<any>(`${this.URL_LOCAL}/deleteBudget`, { params: params });
  }

  addNewExpense(payload:any):Observable<any>{
    return this._httpClient.put<any>(`${this.URL_LOCAL}/addNewExpense`, payload)
  }

}