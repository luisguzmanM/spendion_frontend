import { Injectable } from '@angular/core';
import { API_URL_LOCAL, API_URL_PRODUCTION } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Budget } from '../models/budget.model';
import { UtilsService } from './utils.service';
import { Person } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  URL_PRODUCTION: string = API_URL_PRODUCTION + '';
  URL_LOCAL: string = API_URL_LOCAL + '/home';

  private budgets: any[] = [];
  private budgetSubject = new BehaviorSubject<any[]>([]);
  private person: Person;
  public dataBudgets$: Observable<any[]> = this.budgetSubject.asObservable()

  constructor(
    private _httpClient: HttpClient,
    private utilsSvc: UtilsService
  ) {
    this.person = this.utilsSvc.getDataPerson();
    this.getBudgets(this.person.id_person);
  }

  getBudgets(id_person:number){
    const params = new HttpParams().append('id_person', id_person.toString());
    this._httpClient.get<any[]>(`${this.URL_PRODUCTION}`, {params: params}).subscribe({
      next: data => {
        this.budgets = data
        this.budgetSubject.next(this.budgets);
      },
      error: err => {
        console.error('Error fetching budgets:', err);
      }
    })
  }

  createBudget(budget:any){
    this._httpClient.post(`${this.URL_PRODUCTION}/createBudget`, budget).subscribe({
      next: budget => {
        this.budgets.push(budget)
        this.budgetSubject.next(this.budgets)
      },
      error: err => {
        console.log('Error creating new budget');
      }
    })
  }

  deleteBudget(id_budget:number){
    console.log(id_budget)
    const params = new HttpParams().append('id_budget', id_budget.toString())
    this._httpClient.delete(`${this.URL_PRODUCTION}/deleteBudget`, {params: params}).subscribe({
      next: () => {
        this.budgets = this.budgets.filter(budget => budget.id_budget != id_budget);
        this.budgetSubject.next(this.budgets)
      },
      error: () => {
        console.log('Error deleting budget')
      }
    })
  }

  updateRecordBudget(id_budget:number, record:any){
    const data = {
      id_budget: id_budget,
      record: record
    }
    this._httpClient.put(`${this.URL_PRODUCTION}/updateRecord`, data).subscribe({
      next: record => {
        this.budgets.map(budget => {
          if(budget.id_budget === id_budget){
            budget.record = record
            this.updateBudgetValues(budget)
          }
        })
        this.budgetSubject.next(this.budgets)
      },
      error: () => {
        console.log('Error creating new expense')
      }
    })
  }

  updateBudgetValues(budget){
    const spent = budget.record.reduce((acc, e) => acc + e.amount, 0)
    const free = budget.amount > spent ? budget.amount - spent : 0;
    const progress = budget.amount > spent ? (spent * 100) / budget.amount : 100;
    budget.spent = spent;
    budget.free = free;
    budget.progress = progress
  }
}
