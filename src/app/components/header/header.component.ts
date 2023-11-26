import { Component, Input, OnInit } from '@angular/core';

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
import { UtilsService } from 'src/app/services/utils.service';

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
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Dashboard';
  @Input() subtitle: boolean;
  @Input() user: any;
  @Input() avatar: string;
  @Input() backRoute: string;
  @Input() premium_plan: boolean = false;

  free_days: number = null;

  constructor(
    private router: Router,
    private _utilsSvc: UtilsService
  ) {}

  ngOnInit():void {
    this.getFreeDays();
  }

  loggout():void {
    localStorage.removeItem('person');
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getFreeDays():void {
    const person = this._utilsSvc.getDataPerson();
    const { created, confirmed } = person;
    if(confirmed){
      const days = 30;
      const currentDate = new Date();
      const freeDays =  Math.floor((currentDate.getTime() - new Date(created).getTime()) / (1000 * 3600 * 24));
      this.free_days = days - freeDays;
    }
  }

}
