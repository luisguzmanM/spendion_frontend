import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { SignUp, AuthResponse } from 'src/app/models/auth.model';
import { Router, RouterModule } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
  providers: [
    AuthService,
    UtilsService
  ]
})

export class SignupComponent {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
  })

  constructor(
    private _AuthSvc: AuthService,
    private _utilSvc: UtilsService,
    private router: Router
  ) { }

  signup(): void {
    const user = this.buildUserObject()
    this.callSignUpService(user)
  }

  buildUserObject(): SignUp {
    return {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }
  }

  callSignUpService(userData: SignUp) {
    this._AuthSvc.signup(userData).subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => this.handleError(err)
    })
  }

  handleResponse(res: AuthResponse): void {
    this._utilSvc.openSnackBar('Signup success', 'Close');
    localStorage.setItem('token', res.token);
    localStorage.setItem('person', JSON.stringify(res.person));
    this.router.navigate(['/dashboard']);
  }

  handleError(err): void {
    this._utilSvc.openSnackBar(err.error.msj, 'Close');
  }

}
