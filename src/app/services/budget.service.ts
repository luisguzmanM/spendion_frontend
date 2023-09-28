import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  URL_LOCAL: string = API_URL_LOCAL + '/home';

  private budgets: any[] = [];
  private _budgets$: BehaviorSubject<Budget[]>;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._budgets$ = new BehaviorSubject<Budget[]>([]);
  }

  getBudgets(id_person:number){
    const params = new HttpParams().append('id_person', id_person.toString());
    this._httpClient.get(`${this.URL_LOCAL}`, {params: params}).subscribe({
      next: budgets => {
        this.budgets = Array.isArray(budgets) ? budgets : [];
        this._budgets$.next(this.budgets);
      },
      error: err => {
        console.error('Error fetching budgets:', err);
      }
    })
  }

  get budgetsGetter(){
    return this._budgets$.asObservable();
  }

  createBudget(budget:Budget){
    this._httpClient.post(`${this.URL_LOCAL}/createBudget`, budget).subscribe({
      next: budget => {
        this.budgets.push(budget);
        this._budgets$.next(this.budgets);
      },
      error: err => {
        console.log('Error creating new budget');
      }
    })
  }

}
