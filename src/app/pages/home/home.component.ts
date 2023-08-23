import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Angular material
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


// Components
import { CategoryComponent } from 'src/app/components/category/category.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { ModalCrudComponent } from 'src/app/components/modal-crud/modal-crud.component';
import { ModalCategoryComponent } from 'src/app/components/modal-category/modal-category.component';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SummaryComponent,
    CategoryComponent,
    TransactionComponent,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ]
})
export class HomeComponent {

  user = {
    first_name: 'Luis',
    last_name: 'Guzman',
    photo: '',
    summary: [
      {
        title: 'Income',
        icon: 'attach_money',
        amount: 1800,
      },
      {
        title: 'Expense',
        icon: 'call_missed_outgoing',
        amount: 450,
      },
      {
        title: 'Balance',
        icon: 'account_balance',
        amount: 1350,
      },
    ],
    record: [],
    categories: [
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
      {
        title: 'life',
        budget: 900,
        spent: 90,
        available: 810,
        progress: 30,
      },
    ]
  };

  constructor(
    public dialog: MatDialog,
  ){}

  openDialogCrud(type:string): void {

    let title: string = '';
    let labelTextField: string = '';
    let labelNumberField: string = '';

    if(type === 'create'){
      title = 'Create category';
      labelTextField = 'Title';
      labelNumberField = 'Budget';
    } else if(type === 'update') {
      title = 'Update category';
      labelTextField = 'Title';
      labelNumberField = 'Budget';
    } else {
      title = 'Update expense';
      labelTextField = 'Description';
      labelNumberField = 'Amount';
    }

    const dialogRef = this.dialog.open(ModalCrudComponent, {
      width: '250px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: title,
        labelTextField: labelTextField,
        labelNumberField: labelNumberField
      },
    })
  }

  openDialogCategory(category:any):void {

    const { title, budget, spent, available, progress } = category;

    const dialogRef = this.dialog.open(ModalCategoryComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: title,
        budget: budget,
        spent: spent,
        available: available,
        progress: progress
      },
    })
    
  }
}