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
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from 'src/app/services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContainerCategoriesComponent } from 'src/app/components/container-categories/container-categories.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    HomeService,
    UtilsService
  ],
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ContainerCategoriesComponent
  ]
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  user;

  constructor(
    public dialog: MatDialog,
    private _homeSvc: HomeService,
    private _utilsSvc: UtilsService
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

    dialogRef.componentInstance.confirm.subscribe(res => {
      
      const newCategory = {
        title: res.title,
        budget: res.budget,
        available: res.budget,
        progress: 0,
        record: null,
        spent: 0,
        id_category: res.id_category
      }
      
      this.user.categories.push(newCategory)
      
      dialogRef.componentInstance.loading = false;

      dialogRef.close()
      this._utilsSvc.openSnackBar('Category created successfully', 'Close');
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

  deleteCategory(event:any):void {
    this.user.categories = this.user.categories.filter(c => c.id_category !== event.deletedCategory.id_category);
  }
}