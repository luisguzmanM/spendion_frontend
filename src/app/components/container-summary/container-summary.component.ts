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

  constructor(
    private _homeSvc: HomeService
  ){}

  ngOnInit(): void {
    this.getSummary();
  }

  getIncome():number {
    let income = 0;
    this._homeSvc.getIncome(this.token).subscribe(res => {
      income = res.income;
    })
    return income;
  }

  getSummary():void {
    const income = this.getIncome();
    console.log(income)
    const expense = this.budgets.map(c =>{
      if(c.record !== null){
        return c.record.reduce((acc:number, e:any) => acc + e.amount, 0);
      } else {
        return 0;
      }
    }).reduce((acc, e) => acc + e, 0);
    const balance = income - expense;
    this.summary = [
      {
        title: 'Income',
        icon: '',
        amount: income.toFixed(2)
      },
      {
        title: 'Expense',
        icon: '',
        amount: expense.toFixed(2)
      },
      {
        title: 'Balance',
        icon: '',
        amount: balance.toFixed(2)
      },
    ]
  }

}
