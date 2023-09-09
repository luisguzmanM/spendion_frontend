import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Login } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    LogoComponent
  ],
  providers: [AuthService, UtilsService]
})

export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
  })

  constructor(
    private _AuthSvc: AuthService,
    private _utilSvc: UtilsService,
    private router: Router
  ) { }

  login(): void {
    const user = this.buildUserObject()
    this.callLoginService(user)
  }

  buildUserObject(): Login  {
    return {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }
  }

  callLoginService(userData: Login ) {
    this._AuthSvc.login(userData).subscribe({
      next: (res) => {
        this._utilSvc.openSnackBar('Login success', 'Close')
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('userEmail', this.form.controls.email.value)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this._utilSvc.openSnackBar(err.error.msj, 'Close')
      }
    })
  }
}