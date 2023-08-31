import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: true,
  imports: [
    CommonModule,

    // Angular material components
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SummaryComponent implements OnInit {

  @Input() summary: any;

  constructor(
    private _categorySvc: CategoryService
  ){}

  ngOnInit(): void {
    this.getTotalExpenses();
  }

  getTotalExpenses():void{
    this._categorySvc.getCategories().subscribe(res => {
      console.log(res)
    })
  }

}
