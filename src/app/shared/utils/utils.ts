import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { ALERT_TYPE,ERROR_CODE_MESSAGES, message } from "../constants";
import { AlertMsg } from "../interfaces/alert-msg.model";


export class Utils {

  private static SECRET_LENGTH = 24;
  private static readonly encode = true;

  /**
   * Metodo para enmascarar un valor
   * @param value - valor a enmascarar
   * @param init - arreglo de indices donde se desea que empiece a enmascarar, pueden ser varios (Ej. pos 4 y pos 10).
   * @param howmany - cuantos carcteres a enmascarar
   * @param character - que caracter se va a usar para enmascarar
   * @returns valor enmascarado.
   */
  static maskValue(value: string, init: Array<number>, howmany: number, character: string): string {
    let tmpvalue = value;
    if (value && value != null && value.length > 0) {
      for (const index of init) {
        // Si el indice de donde se quiere empezar a reemplazar es mayor que 0 y esta dentro del tamaño del valor a enmascarar
        if (index >= 0 && index < value.length) {

          tmpvalue = value.slice(0, index - 1) + character.repeat(howmany);

          if (index + howmany < value.length) {
            tmpvalue = tmpvalue + value.slice(index + howmany - 1, value.length);
          }
        }
        value = tmpvalue;
      }
    }
    return value;
  }

  /**
   * Método para validar el mail programaticamente.
   *
   * @param  email - email a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateMail(email: string): boolean {
    let valid = true;
    if (email && email !== null && email.trim() !== '') {
      const emailRegEx = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
      valid = emailRegEx.test(email);
    }
    return valid;
  }

  /**
   * Método para validar si es solo números.
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateOnlyNumbers(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const onlyNumbersRegEx = /^[0-9\s]*$/i;
      valid = onlyNumbersRegEx.test(input);
    }
    return valid;
  }

  /**
   * Método para validar si es solo letras.
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateOnlyLetters(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const regEx = /^[A-Z\s]*$/i;
      valid = regEx.test(input);
    }
    return valid;
  }

  /**
   * Método para validar si es alfanumérico.
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateAlphanumeric(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const regEx = /^[A-Z0-9ÁÉÍÓÚ\s]*$/i;
      valid = regEx.test(input);
    }
    return valid;
  }


  /**
   * Método para validar la cédula.
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateLegalId(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const regEx = /^[0-9]{10}$/i;
      valid = regEx.test(input);
    }
    return valid;
  }

  /**
   * Método para validar el RUC
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateRUC(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const regEx = /^[0-9]{13}$/i;
      valid = regEx.test(input);
    }
    return valid;
  }

  /**
   * Método para validar el número de pasaporte
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validatePassport(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const regEx = /^[A-Z0-9]{1,20}$/g;
      valid = regEx.test(input);
    }
    return valid;
  }

  /**
   * Método para validar la longitud del número de teléfono celular.
   *
   * @param  input - input a validar
   * @returns true si es valido, caso contrario false.
   */
  static validateCellularPhone(input: string): boolean {
    let valid = true;
    if (input && input !== null && input.trim() !== '') {
      const regEx = /^[0-9]{10,15}$/i;
      valid = regEx.test(input);
    }
    return valid;
  }





  /**
   * Método que permite obtener el mensaje a presentar al cliente.
   * @param error
   */
  static processError(error: any, severity?: string): AlertMsg | null {
    let alertMsg: any = null;
    if (error instanceof AlertMsg) {
      alertMsg = error;
    } else {
      if (error.status || error.status >= 0) {
        let msg = ERROR_CODE_MESSAGES[error.status];
        let errorCode = null;
        if (error.status === 403 && error.error) {
          msg = error.error.message ? error.error.message : error.error.cause;
        }
        if((error.status === 400 || error.status === 404 || error.status === 409) && !!error.error && !!error.error.message){
          msg = error.error.message;
          if(error.error.codigo){
            errorCode = error.error.codigo;
          }
        }
        if (msg && msg != null) {
          alertMsg = new AlertMsg(ALERT_TYPE.ERROR, msg);
          alertMsg.statusCode = error.status;
          alertMsg.errorCode = errorCode;
        }
      }

      if (alertMsg == null) {
        if (error.message) {
          if (severity) {
            alertMsg = new AlertMsg(severity, error.message);
          } else {
            alertMsg = new AlertMsg(ALERT_TYPE.ERROR, error.message);
          }
        } else {
          alertMsg = new AlertMsg(ALERT_TYPE.ERROR, message.CONTACT_ADMIN);
        }
        alertMsg.statusCode = error.status;
      }
    }
    console.log("alertMsg", alertMsg);
    return alertMsg;
  }

  /**
   * Método que permite obtener el mensaje a presentar al cliente.
   * @param error
   */
  static processServiceError(error: any): AlertMsg {
    let alertMsg: any = null;
    if (error instanceof AlertMsg) {
      alertMsg = error;
    } else {
      if (error.status || error.status >= 0) {
        let msg = ERROR_CODE_MESSAGES[error.status];
        if (error.error && error.error.message && error.status == 400) {
          msg = error.error.message;
        }
        if (error.error && error.error.message && error.status == 500) {
          msg = error.error.message;
        }
        if (msg && msg != null) {
          alertMsg = new AlertMsg(ALERT_TYPE.ERROR, msg);
          alertMsg.statusCode = error.status;
        }
      }

      if (alertMsg == null) {
        if (error.message) {
          alertMsg = new AlertMsg(ALERT_TYPE.ERROR, error.message);
        } else {
          alertMsg = new AlertMsg(ALERT_TYPE.ERROR, message.CONTACT_ADMIN);
        }
      }
    }

    return alertMsg;
  }



  /**
   * Método para validar si es un campo válido
   * @param input - input string, si es string valida que no sea undefined, null o ''.
   * @returns
   */
  static hasContentValue(input: string | number): boolean {
    let valid = false;
    if (typeof input === 'string') {
      if (input && input != null && input.trim() !== '') {
        valid = true;
      }
    }
    return valid;
  }

  /**
   * Metodo para validar input
   * @param control el control del componente input
   * @param errorType tipo de error "requiret,pattern,maxleng"
   * @returns
   */
  static isValidField( control: FormControl, errorType: string ) {
    return control.invalid && (control.dirty || control.touched) && control.errors?.[errorType];
  }


  /**
   * Metodo para ver si dos valores son iguales
   * @param field1 field1
   * @param field2 field2
   * @returns
   */
  static isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

}
