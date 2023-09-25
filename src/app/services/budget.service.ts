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
  transactionSubject$: BehaviorSubject<any[]>;

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.transactionSubject$ = new BehaviorSubject<any[]>([]);
  }

  createBudget(payload:Budget):Observable<any>{
    return this._httpClient.post<any>(`${this.URL_LOCAL}/createBudget`, payload);
  }

  getBudgets(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this._httpClient.get(`${this.URL_LOCAL}`, { params: params });
  }
  
  updateRecord(payload:any):Observable<any>{
    return this._httpClient.put<any>(`${this.URL_LOCAL}/updateRecord`, payload)
  }

  deleteBudget(payload:any):Observable<any>{
    const params = new HttpParams().append('id_budget', payload.id_budget);
    return this._httpClient.delete<any>(`${this.URL_LOCAL}/deleteBudget`, { params: params });
  }

  getTransactions(){
    return this.transactionSubject$.asObservable();
  }

  setTransaction(transaction:any){
    this.transactionSubject$.next(transaction);
  }

}
