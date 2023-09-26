import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  URL_LOCAL: string = API_URL_LOCAL + '/home';

  constructor(
    private _httpClient: HttpClient
  ) {}

  createBudget(budget:Budget):Observable<any>{
    return this._httpClient.post<any>(`${this.URL_LOCAL}/createBudget`, budget);
  }

  getBudgets(id_person: number): Observable<Budget[]> {
    const params = new HttpParams().set('id', id_person.toString());
    return this._httpClient.get<Budget[]>(`${this.URL_LOCAL}`, { params: params });
  }
  
  updateRecord(record:any):Observable<any>{
    return this._httpClient.put<any>(`${this.URL_LOCAL}/updateRecord`, record)
  }

  deleteBudget(budget:any):Observable<any>{
    const params = new HttpParams().append('id_budget', budget.id_budget);
    return this._httpClient.delete<any>(`${this.URL_LOCAL}/deleteBudget`, { params: params });
  }

}
