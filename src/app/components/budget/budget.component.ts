import { Component, Input } from '@angular/core';

// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class BudgetComponent {

  @Input() data: any;

  constructor() { }

}
