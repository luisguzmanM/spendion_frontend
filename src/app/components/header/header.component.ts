import { Component, Input } from '@angular/core';

// Angular material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
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

  @Input() title: string;
  @Input() subtitle: boolean;
  @Input() user: any;
  @Input() avatar: string;

  constructor() {}

}
