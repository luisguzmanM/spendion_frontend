import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';

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

  @Input() categories: any;
  summary: any[] = [];

  constructor(){}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary():void {
    console.log(this.categories.length)
    const income = 1800;
    const expense = this.categories.map(c => c.record.reduce((acc, e) => acc + e.amount, 0)).reduce((acc, e) => acc + e, 0);
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
