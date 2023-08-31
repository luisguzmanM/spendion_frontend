import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-container-categories',
  templateUrl: './container-categories.component.html',
  styleUrls: ['./container-categories.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CategoryComponent,
  ],
})

export class ContainerCategoriesComponent implements OnInit {

  @Input() categories: any;

  constructor(
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {}

  openDialogCategory(category: any): void {
    const { title, budget, spent, available, progress, record, id_category } = category;
    const dialogRef = this.dialog.open(ModalCategoryComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: title,
        budget: budget,
        spent: spent,
        available: available,
        progress: progress,
        record: record,
        id_category: id_category
      },
    });
  }

}
