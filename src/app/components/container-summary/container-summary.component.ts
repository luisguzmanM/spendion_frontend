import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';
import { HomeService } from 'src/app/services/home.service';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-container-summary',
  templateUrl: './container-summary.component.html',
  styleUrls: ['./container-summary.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SummaryComponent
  ],
})
export class ContainerSummaryComponent implements OnInit {

  token = localStorage.getItem('token');
  summary: any[] = [];
  budgets: any[] = [];

  income: number = 0;
  spent: number = 0;
  balance: number = 0;

  constructor(
    private _budgetSvc: BudgetService,
    private _homeSvc: HomeService
  ){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this._homeSvc.getIncome(token).subscribe(res => {
      this.income = res
    })
    this._budgetSvc.dataBudgets$.subscribe(budgets => {
      this.budgets = budgets
      this.getSummary();
      this.buildSummary();
    })
  }

  getSummary():void {
    this.budgets.map(budget => {
      if(budget.record !== null){
        this.spent = budget.record.reduce((acc, e) => acc + e.amount, 0);
      }
    })
    this.balance = this.income - this.spent;
  }

  buildSummary(){
    this.summary = [
      {
        title: 'Incomes',
        amount: this.income
      },
      {
        title: 'Expenses',
        amount: this.income
      },
      {
        title: 'Balance',
        amount: this.balance
      }
    ]
  }
}
