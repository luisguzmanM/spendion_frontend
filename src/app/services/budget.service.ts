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

  private budgets: Budget[] = [];
  private _budgets$: BehaviorSubject<Budget[]>;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._budgets$ = new BehaviorSubject<Budget[]>([]);
  }

  createBudget(budget:Budget){
    this._httpClient.post<any>(`${this.URL_LOCAL}/createBudget`, budget).subscribe(res => {
      this.budgets.push(res.budget);
      this._budgets$.next(this.budgets);
    })
  }

  getBudgetsFromBackend() {
    const person = JSON.parse(localStorage.getItem('person'));
    const params = new HttpParams().set('id', person.id_person.toString());
    this._httpClient.get<any>(`${this.URL_LOCAL}`, { params: params }).subscribe(res => {
      this.budgets = res.budgets;
      this._budgets$.next(this.budgets);
    })
  }

  getBudgets(){
    return this._budgets$.asObservable();
  }
  
  updateRecord(record:any):Observable<any>{
    return this._httpClient.put<any>(`${this.URL_LOCAL}/updateRecord`, record)
  }

  deleteBudget(budget:any):Observable<any>{
    const params = new HttpParams().append('id_budget', budget.id_budget);
    return this._httpClient.delete(`${this.URL_LOCAL}/deleteBudget`, { params: params });
  }


}
