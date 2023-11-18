import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PaymentComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PaymentCardComponent {

}
