import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css']
})
export class SubscriptionModalComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<SubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit():void {

  }

}
