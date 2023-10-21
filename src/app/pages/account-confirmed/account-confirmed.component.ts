import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    UtilsService
  ]
})
export class AccountConfirmedComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authSvc: AuthService,
  ){}

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this._authSvc.confirmAccount(token).subscribe({
          next: resp => {
            console.log(resp)
            setTimeout(() => {
              this._router.navigate(['/login'])
            }, 10000);
          },
          error: err => {
            console.log(err)
          }
        })
      } else {
        console.log('The is an error with the url token')
      }
    });
  }

}
