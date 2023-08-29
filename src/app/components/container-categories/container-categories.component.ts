import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-container-categories',
  templateUrl: './container-categories.component.html',
  styleUrls: ['./container-categories.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CategoryComponent,
    MatProgressSpinnerModule
  ],
})

export class ContainerCategoriesComponent implements OnInit {

  @Input() categories: any;
  loading: boolean = false;

  constructor(){
    
  }

  ngOnInit(): void {
    console.log(this.categories)
  }

}
