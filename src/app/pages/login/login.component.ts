import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

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
    RouterModule
  ],
})

export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })


  constructor(
    private _AuthSvc: AuthService,
    private _router: Router
  ){}

  login():void {
    
    const user = this.buildUserObject()
    this.callSignUpService(user)
  }

  buildUserObject():User{
    return {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }
  }

  callSignUpService(userData:User){
    this._AuthSvc.login(userData).subscribe(res => {
      this._router.navigate(['/dashboard'])
    })
  }

}
