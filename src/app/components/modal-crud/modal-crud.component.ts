import { Component, Inject, Input } from '@angular/core';
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
    HttpClientModule
  ],
  providers: [CategoryService]
})
export class ModalCrudComponent {

  defaultTitle: string = 'Title modal';
  defaultLabelTextField = 'Text field';
  defaultLabelNumberField = 'Number field';

  form: FormGroup;

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildObjectNewCategory():any {
    return {
      title: this.form.controls['title'].value,
      budget: this.form.controls['budget'].value,
      token: localStorage.getItem('token')
    }
  }

  callServiceCreateCategory():void {
    const newCategory = this.buildObjectNewCategory();
    this._categorySvc.createCategory(newCategory).subscribe(res => {
      console.log(res)
    })
  }

}
