import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Angular material
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { CategoryComponent } from 'src/app/components/category/category.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { ModalCrudComponent } from 'src/app/components/modal-crud/modal-crud.component';
import { ModalCategoryComponent } from 'src/app/components/modal-category/modal-category.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from 'src/app/services/home.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService],
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
    HttpClientModule,
    MatProgressSpinnerModule
  ]
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  user;

  constructor(
    public dialog: MatDialog,
    private _homeSvc: HomeService
  ) { }

  ngOnInit(): void {
    this.getDataUser()
  }

  openDialogCrud(type: string): void {

    let title: string = '';
    let labelTextField: string = '';
    let labelNumberField: string = '';

    if (type === 'create') {
      title = 'Create category';
      labelTextField = 'Title';
      labelNumberField = 'Budget';
    } else if (type === 'update') {
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

  openDialogCategory(category: any): void {

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

  getDataUser() {
    this.loading = true;
    const email = localStorage.getItem('userEmail') || '';
    this._homeSvc.getAllDataUser(email).subscribe((res) => {
      this.user = res;
      this.loading = false;
    })
  }
}