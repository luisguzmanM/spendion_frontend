import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
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
import { BudgetService } from 'src/app/services/budget.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TYPE_ELEMENT } from 'src/app/models/budget.model';

@Component({
  selector: 'app-modal-budget',
  templateUrl: './modal-budget.component.html',
  styleUrls: ['./modal-budget.component.css'],
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
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [BudgetService]
})

export class ModalBudgetComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'desc', 'amount'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() deleteBudgetEmitter: any = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalBudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _categorySvc: BudgetService,
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data.record);
    console.log(this.data)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openModalAddNewExpense() {
    const dialogRef = this.dialog.open(ModalCrudComponent, {
      width: '250px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: 'Create expense',
        labelTextField: 'Description',
        labelNumberField: 'amount',
        type: TYPE_ELEMENT.EXPENSE
      },
    })

    dialogRef.componentInstance.newExpenseEmitter.subscribe(res => {
      
      res.id_budget = this.data.id_budget;
      console.log(res)
      this._categorySvc.updateRecord(res).subscribe({
        next: (res) => this.updateModal(res, dialogRef), 
        error: (err) => console.log(err)
      })
      
    })
  }

  updateModal(res:any, dialogRef):void {
    console.log(res)
    // const budget = res.filter(c => c.id_category === this.data.id_category)
    // this.dataSource.data = category[0].record;
    // this.data.spent = category[0].record.reduce((acc, e) => acc + e.amount, 0);
    // this.data.available = this.data.budget - this.data.spent;
    // this.data.available > this.data.budget ? this.data.available = this.data.budget : this.data.available;
    // this.data.progress = (this.data.spent * 100) / this.data.budget;
    dialogRef.componentInstance.loading = false;
    dialogRef.close(); 
  }

  openModalDeleteBudget(): void {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      width: '300px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: 'Delete budget',
        actionMessage: 'Are you sure to delete this budget?',
      },
    })

    dialogRef.componentInstance.confirmButton.subscribe(res => {
      this.deleteBudget(dialogRef);
    })
  }

  deleteBudget(dialog): void {
    const payload = {
      token: localStorage.getItem('token'),
      id_budget: this.data.id_budget
    }
    this._categorySvc.deleteBudget(payload).subscribe({
      next: (res) => {
        this.deleteBudgetEmitter.emit(payload.id_budget);
        dialog.loading = false;
        dialog.close();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}