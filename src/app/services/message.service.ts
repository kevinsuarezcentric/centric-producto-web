import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ALERT_TYPE } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private _snackBar = inject( MatSnackBar);

  constructor() {
  }


  /**
   * Method open dialog error
   * @param message message error
   * @param action error, warning
   */
  showSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: ALERT_TYPE.TIME,
    })
  }
}
