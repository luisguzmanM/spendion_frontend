import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-modal-crud',
  templateUrl: './modal-crud.component.html',
  styleUrls: ['./modal-crud.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [CategoryService]
})

export class ModalCrudComponent implements OnInit {

  defaultTitle: string = 'Title modal';
  defaultLabelTextField = 'Text field';
  defaultLabelNumberField = 'Number field';
  form: FormGroup;
  loading: boolean = false;
  
  @Output() confirmation: any = new EventEmitter();
  @Output() newExpenseObj: any = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categorySvc: CategoryService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildObject(): any {
    return {
      title: this.form.controls['title'].value,
      budget: this.form.controls['budget'].value,
      token: localStorage.getItem('token')
    }
  }

  confirm(): void {
    const obj = this.buildObject();
    if(this.data.type === 'insert'){
      this.newExpenseObj.emit(obj);
    } else {
      this.loading = true;
      this._categorySvc.createCategory(obj).subscribe(res => {
        this.confirmation.emit(res);
      })
    }
  }

}
