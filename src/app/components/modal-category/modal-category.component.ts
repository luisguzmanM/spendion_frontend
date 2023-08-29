import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalCrudComponent } from '../modal-crud/modal-crud.component';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [CategoryService]
})

export class ModalCategoryComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'desc', 'amount', 'category'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ModalCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _categorySvc: CategoryService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data.record);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openModalUpdateCategory(type: string) {
    let title: string = '';
    let labelTextField: string = '';
    let labelNumberField: string = '';

    if (type === 'insert') {
      title = 'Insert new expense';
      labelTextField = 'Description';
      labelNumberField = 'Amount';
    }

    if (type === 'update') {
      title = 'Update category';
      labelTextField = 'Title';
      labelNumberField = 'Budget';
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

  openModalCategoryConfirmation(action: string): void {
    let title: string = '';
    let actionMessage: string = '';

    if (action === 'reset') {
      title = 'Reset category';
      actionMessage = 'Are you sure to reset this category?';
    }

    if (action === 'delete') {
      title = 'Delete category';
      actionMessage = 'Are you sure to delete this category?';
    }

    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      width: '300px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: title,
        actionMessage: actionMessage,
      },
    })

    dialogRef.componentInstance.deleteCategory.subscribe(res => {
      this.callCategoryDeleteService();
    })
  }

  callCategoryDeleteService(): void {
    const payload = {
      token: localStorage.getItem('token'),
      id_category: this.data.id_category
    }
    this._categorySvc.deleteCategory(payload).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}