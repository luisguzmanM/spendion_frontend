import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';
import { HomeService } from 'src/app/services/home.service';

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
  @Input() budgets: any;
  summary: any[] = [];

  income: number = 0;
  spent: number = 0;
  balance: number = 0;

  constructor(
    private _homeSvc: HomeService
  ){}

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome():void {
    this._homeSvc.getIncome(this.token).subscribe(res => {
      this.income = res.income;
      this.getSummary();
    })
  }

  getSummary():void {
    const expense = this.budgets.map(c => {
      if(c.record !== null){
        return c.record.reduce((acc:number, e:any) => acc + e.amount, 0);
      } else {
        return 0;
      }
    }).reduce((acc, e) => acc + e, 0);

    
    const balance = this.income - expense;

    this.spent = expense;
    this.balance = balance;

    this.summary = [
      {
        title: 'Income',
        icon: '',
        amount: this.income
      },
      {
        title: 'Expense',
        icon: '',
        amount: expense
      },
      {
        title: 'Balance',
        icon: '',
        amount: balance
      },
    ]
  }

  updateValues(event){    
    this.balance = event.amount - this.spent;
    this.summary = [
      {
        title: 'Income',
        icon: '',
        amount: event.amount
      },
      {
        title: 'Expense',
        icon: '',
        amount: this.spent
      },
      {
        title: 'Balance',
        icon: '',
        amount: this.balance
      },
    ]
  }
}
