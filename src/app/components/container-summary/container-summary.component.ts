import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';
import { HomeService } from 'src/app/services/home.service';
import { Budget } from 'src/app/models/budget.model';

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
  budgets: Budget[] = [];

  income: number = 0;
  spent: number = 0;
  balance: number = 0;

  constructor(){}

  ngOnInit(): void {}
}
