import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ],
})

export class TransactionComponent implements OnInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  transactions: any[] = [];
  displayedColumns: string[] = ['date', 'desc', 'amount', 'budget'];
  dataSource;

  constructor(
    private _budgetSvc: BudgetService
  ) {
    this.dataSource = new MatTableDataSource<any>(this.transactions);
  }

  ngOnInit(): void {
    this._budgetSvc.budgetsGetter.subscribe(budgets => {
      this.getAllTransactions(budgets)
    })
  }

  getAllTransactions(budgets:any){
    
  }
  
}