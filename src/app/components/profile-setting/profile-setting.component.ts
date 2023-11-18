import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SettingService } from 'src/app/services/setting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  providers: [
    UtilsService,
    SettingService
  ]
})
export class ProfileSettingComponent {

  value: string;
  formCtrl = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    photo: new FormControl(null, [Validators.required]),
  })
  loading: boolean = false;

  constructor(
    private _settingSvc: SettingService,
    private _utilsSvc: UtilsService
  ){

  }

  saveChanges():void {
    const user = this.buildUserObject();
    this.loading = true;
    this._settingSvc.updateDataUser(user).subscribe({
      next: data => this.handleUpdateUserDataResponse(data),
      error: err => this.handleUpdateUserDataError(err)
    });
  }
  
  buildUserObject() {
    return {
      firstName: this.formCtrl.controls.firstName.value,
      lastName: this.formCtrl.controls.lastName.value,
      email: this.formCtrl.controls.photo.value
    }
  }

  handleUpdateUserDataResponse(data){
    console.log(data)
    this.loading = false;
    this._utilsSvc.openSnackBar('Updated :D', 'Close');
  }

  handleUpdateUserDataError(error){
    console.log(error)
    this.loading = false;
    this._utilsSvc.openSnackBar('Error trying to update user data', 'Close');
  }

}
