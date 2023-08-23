import { Component, Input } from '@angular/core';

// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class CategoryComponent {

  @Input() data: any;

  constructor() { }

}
