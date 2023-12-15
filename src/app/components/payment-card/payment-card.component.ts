import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionService } from 'src/app/services/subscription.service';

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
  providers: [
    SubscriptionService
  ]
})
export class PaymentCardComponent {

  constructor(
    private _subscriptionSvc: SubscriptionService
  ){}

  createProduct(){
    this._subscriptionSvc.createProduct().subscribe(res => {
      console.log('ID product :', res.data.id);
      this.createPlan(res.data.id);
    })
  }

  createPlan(idProduct:string){
    this._subscriptionSvc.createPlan(idProduct).subscribe(res => {
      console.log('ID plan: ', res.data.id);
      this.createSubscription(res.data.id);
    })
  }

  createSubscription(idPlan:string){
    this._subscriptionSvc.createSubscription(idPlan).subscribe(res => {
      this.redirectUserToPaymentPage(res.data.links);
    })
  }

  redirectUserToPaymentPage(links:any):void {
    links = links.filter(link => link.rel === 'approve' && link.method === 'GET');
    window.location.href = links[0].href;
  }

}
