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

}
