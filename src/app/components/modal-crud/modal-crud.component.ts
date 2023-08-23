import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
})
export class ModalCrudComponent {

  defaultTitle: string = 'Title modal';
  defaultLabelTextField = 'Text field';
  defaultLabelNumberField = 'Number field';

  constructor(
    public dialogRef: MatDialogRef<ModalCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
