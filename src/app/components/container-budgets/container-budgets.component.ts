import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from '../budget/budget.component';
import { ModalBudgetComponent } from '../modal-budget/modal-budget.component';
import { MatDialog } from '@angular/material/dialog';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-container-budgets',
  templateUrl: './container-budgets.component.html',
  styleUrls: ['./container-budgets.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BudgetComponent,
  ],
})

export class ContainerBudgetsComponent implements OnInit {

  @Input() budgets: any;
  @Output() deleteBudgetHomeEmitter: any = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private budgetSvc: BudgetService
  ){}

  ngOnInit(): void {}

  openDialogCategory(budget: any): void {
    const { title, amount, spent, free, progress, record, id_budget } = budget;
    const dialogRef = this.dialog.open(ModalBudgetComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: title,
        amount: amount,
        spent: spent,
        free: free,
        progress: progress,
        record: record,
        id_budget: id_budget
      },
    });

    dialogRef.componentInstance.deleteBudgetEmitter.subscribe(res => {
      this.deleteBudgetHomeEmitter.emit(res);
      this.getAllTransactions();
      dialogRef.close();
    })

    dialogRef.componentInstance.recordEmitter.subscribe(res => {
      const budget = this.budgets.filter(b => b.id_budget === res.id_budget);
      budget[0].record = res.record;
      for(let b of this.budgets){
        if(b.id_budget === budget[0].id_budget){
          b.spent = budget[0].record.reduce((acc, e) => acc + e.amount, 0);
          b.free = budget[0].amount > budget[0].spent ? budget[0].amount - budget[0].spent : 0;
          b.progress = budget[0].amount > budget[0].spent ? (budget[0].spent * 100) / budget[0].amount : 100;
        }
      }
      this.getAllTransactions();
    })
  }

  getAllTransactions():void {
    const transactions = []
    for(let b of this.budgets){
      if(b.record === null) return
      for(let r of b.record){
        transactions.push(r)
      }
    }
  }
}
