import { Component, Input } from '@angular/core';

// Angular material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { AvatarComponent } from '../avatar/avatar.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,

    // Angular material components
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,

    // Components
    AvatarComponent,
  ]
})
export class HeaderComponent {

  @Input() title: string = 'Dashboard';
  @Input() subtitle: boolean;
  @Input() user: any;
  @Input() avatar: string;
  @Input() backRoute: string;
  @Input() premium_plan: boolean = false;

  free_days: number = 30;

  constructor(
    private router: Router
  ) {}

  loggout():void {
    localStorage.removeItem('person');
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
