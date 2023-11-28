import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  generarID():string {
    return Math.random().toString(32).substring(2) + Date.now().toString(32)
  }

  getCurrentDate():string {
    const currentDate = new Date();
    const año = currentDate.getFullYear();
    const mes = String(currentDate.getMonth() + 1).padStart(2, '0');
    const día = String(currentDate.getDate()).padStart(2, '0');
    const formatedDate = `${año}-${mes}-${día}`;
    return formatedDate;
  }

  getDataPerson(){
    return JSON.parse(localStorage.getItem('person'));
  }

  getFreeDays() {
    const person = this.getDataPerson();
    const { created, confirmed } = person;
    let free_days = null;
    if(confirmed){
      const days = 30;
      const currentDate = new Date();
      const freeDays =  Math.floor((currentDate.getTime() - new Date(created).getTime()) / (1000 * 3600 * 24));
      free_days = days - freeDays;
      return free_days;
    }
  }
}
