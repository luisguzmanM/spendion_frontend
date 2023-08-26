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
import { User } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils.service';

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
    MatSnackBarModule
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
    private _router: Router,
    private _utilSvc: UtilsService
  ) { }

  login(): void {
    const user = this.buildUserObject()
    this.callLoginService(user)
  }

  buildUserObject(): User {
    return {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }
  }

  callLoginService(userData: User) {
    this._AuthSvc.login(userData).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.user)
        this._utilSvc.openSnackBar('Login success', 'Close')
        setTimeout(() => {
          this._router.navigate(['/dashboard'])
        }, 3000)
      },
      error: (err) => {
        this._utilSvc.openSnackBar(err.error.msj, 'Close')
      }
    })
  }
}