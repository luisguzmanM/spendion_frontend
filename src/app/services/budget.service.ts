import { Injectable } from '@angular/core';
import { API_URL_LOCAL } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Budget } from '../models/budget.model';
import { UtilsService } from './utils.service';
import { Person } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  URL_LOCAL: string = API_URL_LOCAL + '/home';

  private budgets: any[] = [];
  private _budgets$: BehaviorSubject<Budget[]>;
  private person: Person;

  constructor(
    private _httpClient: HttpClient,
    private utilsSvc: UtilsService
  ) {
    this._budgets$ = new BehaviorSubject<Budget[]>([]);
    this.person = this.utilsSvc.getDataPerson()
    this.getBudgets(this.person.id_person);
  }

  getBudgets(id_person:number){
    const params = new HttpParams().append('id_person', id_person.toString());
    this._httpClient.get(`${this.URL_LOCAL}`, {params: params}).subscribe({
      next: budgets => {
        this.budgets = Array.isArray(budgets) ? budgets : [];
        this._budgets$.next(this.budgets);
        console.log('Initial data from backend :', this.budgets)
      },
      error: err => {
        console.error('Error fetching budgets:', err);
      }
    })
  }

  get budgetsGetter(){
    return this._budgets$.asObservable();
  }

  createBudget(budget:any){
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

  deleteBudget(id_budget:number){
    console.log('deleting budget...')
    const params = new HttpParams()
      .append('id_budget', id_budget.toString())
    this._httpClient.delete(`${this.URL_LOCAL}/deleteBudget`, {params: params}).subscribe({
      next: res => {
        console.log(res)
        console.log('budget deleted successfully')
        console.log(this.budgets)
        this.budgets.filter(budget => budget.id_budget !== id_budget)
        console.log(this.budgets);
        this._budgets$.next(this.budgets)
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
    this._httpClient.put(`${this.URL_LOCAL}/updateRecord`, data).subscribe({
      next: response => {
        console.log(response)
      },
      error: () => {
        console.log('Error creating new expense')
      }
    })
  }

}
