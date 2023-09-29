import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from '../budget/budget.component';
import { ModalBudgetComponent } from '../modal-budget/modal-budget.component';
import { MatDialog } from '@angular/material/dialog';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';
import { Person } from 'src/app/models/auth.model';

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

  budgets: Budget[] = [];
  user: Person;

  constructor(
    public dialog: MatDialog,
    private _budgetSvc: BudgetService
  ){}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('person'))    
    this._budgetSvc.budgetsGetter.subscribe(budgets => {
      this.budgets = budgets
    })
  }

  openDialogSelectedBudget(budget: Budget) {
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
        id_budget: id_budget,
        id_person: this.user.id_person
      },
    });   
    dialogRef.componentInstance.closeModalBudgetEmitter.subscribe(() => {
      dialogRef.close()
    }) 
  }
}
