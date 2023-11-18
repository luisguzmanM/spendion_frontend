import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class ProfileSettingComponent {

  value: string;
  formCtrl = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    photo: new FormControl(null, [Validators.required]),
  })

  constructor(){

  }

}
