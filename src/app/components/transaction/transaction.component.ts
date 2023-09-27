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

  transactions: any[] = [];
  displayedColumns: string[] = ['date', 'desc', 'amount', 'budget'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  budgets: Budget[] = [];

  constructor(
    private _budgetSvc: BudgetService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._budgetSvc.getBudgets().subscribe(res => {
      this.budgets = res;
      setTimeout(() => {
        this.getTransactions()
      }, 1000)
    })
  }

  getTransactions(){
    const allRecords = [];
    const allTransactions = [];
    
    this.budgets.forEach(b => {
      if(b.record !== null){
        const obj = {
          record: b.record,
          budget: b.title
        }
        allRecords.push(obj)
      }
    })

    allRecords.forEach(r => {
      if(r.record !== undefined){
        r.record.forEach(x => {
          const obj = {
            budget: r.budget,
            expense: x
          }
          allTransactions.push(obj);
        })
      }
    })

    this.transactions = allTransactions;
    this.dataSource = new MatTableDataSource<any>(this.transactions);
    this.dataSource.paginator = this.paginator;
  }

}