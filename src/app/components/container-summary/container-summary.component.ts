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
    this.summary = [
      {
        title: 'Income',
        icon: '',
        amount: '1800'
      },
      {
        title: 'Expense',
        icon: '',
        amount: '100'
      },
      {
        title: 'Balance',
        icon: '',
        amount: '1700'
      },
    ]
  }

}
