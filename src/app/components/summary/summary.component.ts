import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(){}

  ngOnInit(): void {}

}
