import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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

export class TransactionComponent implements AfterViewInit, OnInit  {

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
    this.dataSource = new MatTableDataSource<any>(this.transactions);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initData(){
    this._budgetSvc.getBudgets().subscribe(res => {
      this.budgets = res;
      // this.getTransactions();
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
      r.record.forEach(x => {
        const obj = {
          budget: r.budget,
          expense: x
        }
        allTransactions.push(obj);
      })
    })

    this.transactions = allTransactions;
  }

}