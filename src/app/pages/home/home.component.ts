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
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { ModalCrudComponent } from 'src/app/components/modal-crud/modal-crud.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from 'src/app/services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContainerCategoriesComponent } from 'src/app/components/container-categories/container-categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { ContainerSummaryComponent } from 'src/app/components/container-summary/container-summary.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    HomeService,
    UtilsService,
    CategoryService
  ],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
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
    ContainerCategoriesComponent,
    ContainerSummaryComponent
  ]
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  user;
  categories: any = [];

  constructor(
    public dialog: MatDialog,
    private _homeSvc: HomeService,
    private _utilsSvc: UtilsService,
    private _categorySvc: CategoryService
  ) { }

  ngOnInit(): void {
    this.getDataUser();
    this.getCategories();
  }

  openDialogCrud(): void {
    const dialogRef = this.dialog.open(ModalCrudComponent, {
      width: '250px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: 'Create category',
        labelTextField: 'Title',
        labelNumberField: 'Budget'
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
      this._categorySvc.setCategories(res.categories);
      this.loading = false;
    })
  }

  getCategories(){
    this._categorySvc.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

}