import { FormGroup } from '@angular/forms';
import { Utils } from '../utils/utils';
import { AlertMsg } from '../interfaces/alert-msg.model';
import { ALERT_TYPE } from '../constants';
import { MessageService } from 'src/app/services/message.service';
import { inject } from '@angular/core';


export class BaseComponent {

  private _screenMessage: any;

  //Expresiones regulares html
  public firstNameAndLastnamePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public onlyLettersPattern = "^[A-Za-z]+$";
  public onlyNumbersPattern = "^[0-9]+$";
  public onlyNumbersAndLettersPattern = "^[A-Za-z0-9]+$";

  protected _messageService = inject(MessageService);

  constructor() {
  }




  protected manageError(error: any, severity?: string): Promise<any> {
    let _error: any = error;
    if (!(_error instanceof AlertMsg)) {
      _error = Utils.processError(error);
    }

    if (_error.isScreenAlert === true) {
      return this.manageScreenMessage(_error, severity);
    } else {
      return new Promise<any>(resolve => {
        if (_error.statusCode !== 401 && _error.statusCode !== 408 && _error.summary) {
          if (severity) {
            error.severity = severity;
          }
          this._messageService.showSnackbar(_error.summary, error.severity);

        }
        resolve('OK');
      });
    }
  }




  /**
 * Meotodo para transformar a pdf o excel
 * @param data objeto del archivo
 * @param filename nombre del archivo
 * @param mime header de la peticion http
 */
  protected downloadFile(data: any, filename: string, mime: string | null): void {
    const blob = new Blob([data], { type: mime || 'application/octet-stream' });
    if (mime == 'application/pdf') {
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => {
        window.URL.revokeObjectURL(blobURL);
      }, 100);
    } else {
      const tempLink = document.createElement("a");
      tempLink.href = window.URL.createObjectURL(blob);
      tempLink.download = `${filename}.xlsx`;
      tempLink.click();
    }
  }




  /**
   * Método para presentar un mensaje en la pagina.
   * @param error
   * @returns {Promise<any>}
   */
  protected manageScreenMessage(error: any, severity?: string): Promise<any> {
    let _error: any = error;
    if (!(_error instanceof AlertMsg)) {
      _error = Utils.processError(error);
    }

    return new Promise<any>(resolve => {
      if (_error.statusCode !== 403 && _error.statusCode !== 401 && _error.statusCode !== 408 && _error.summary) {
        if (severity) {
          error.severity = severity;
        }

        switch (error.severity) {
          case ALERT_TYPE.ERROR:
            error.icon = 'pi pi-times';
            error.class = 'icon-transfer-nok';
            break;
          case ALERT_TYPE.WARN:
            error.icon = 'pi pi-exclamation-triangle';
            error.class = 'icon-transfer-warn';
            break;
          default:
            error.icon = 'pi pi-check';
            error.class = 'icon-transfer-ok';
            break;
        }
        this._screenMessage = error;
      }
      resolve('OK');
    });
  }

  protected successMessage(detail: string) {
    this._messageService.showSnackbar(detail, ALERT_TYPE.SUCCESS);


  }

  protected warningMessage(detail: string) {
    this._messageService.showSnackbar(detail, ALERT_TYPE.WARN);

  }

  protected errorMessage(detail: string) {
    this._messageService.showSnackbar(detail, ALERT_TYPE.ERROR);
  }



  resetFormGroup(formGroup: FormGroup) {
    formGroup.reset();
  }

  getMonthName(month: string): string {
    switch (month) {
      case '01':
        return 'Enero';
      case '02':
        return 'Febrero';
      case '03':
        return 'Marzo';
      case '04':
        return 'Abril';
      case '05':
        return 'Mayo';
      case '06':
        return 'Junio';
      case '07':
        return 'Julio';
      case '08':
        return 'Agosto';
      case '09':
        return 'Septiembre';
      case '10':
        return 'Octubre';
      case '11':
        return 'Noviembre';
      case '12':
        return 'Diciembre';
      default:
        return '';
    }
  }





  showErrorNotienePermisos(titulo: string) {
    const msjError = 'USUARIO NO TIENE PERMISOS DE EJECUCION PARA ' + titulo;
    this._messageService.showSnackbar(msjError, ALERT_TYPE.ERROR);
  }
}
