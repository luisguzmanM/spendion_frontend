import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from '../budget/budget.component';
import { ModalBudgetComponent } from '../modal-budget/modal-budget.component';
import { MatDialog } from '@angular/material/dialog';

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
  @Output() deletedCategoryHomeEmitter: any = new EventEmitter();

  constructor(
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {}

  openDialogCategory(budget: any): void {
    console.log(budget)
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
      this.deletedCategoryHomeEmitter.emit(res);
      dialogRef.close();
    })
  }

}
