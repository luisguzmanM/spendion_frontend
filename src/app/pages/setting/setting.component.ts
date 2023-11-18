import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Person } from 'src/app/models/auth.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentComponent } from 'src/app/components/payment/payment.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatSnackBarModule,
    MatDividerModule,
    PaymentComponent
  ],
  providers: [
    UtilsService
  ]
})
export class SettingComponent implements OnInit {

  user:Person;

  constructor(
    private _utilsSvc: UtilsService
  ){}

  ngOnInit():void {
    this.getDataPersonFromLocalStorage();
  }

  getDataPersonFromLocalStorage(){
    this.user = this._utilsSvc.getDataPerson();
  }

}
