export class AlertMsg {
  private _severity: string;
  private _summary: string;
  private _detail: string | undefined = '';
  private _errorCode = '';
  private _statusCode = '';
  private _isScreenAlert: boolean | undefined = false;

  constructor(severity: string, summary: string | any, detail?: string, isScreenAlert?: boolean) {
    this._severity = severity;
    if (typeof summary === 'string') {
      this._summary = summary;
    } else {
      this._summary = summary.errorDescription;
      this._errorCode = summary.errorCode;
    }
    this._detail = detail;
    this._isScreenAlert = isScreenAlert;
  }

  get severity() {
    return this._severity;
  }

  set severity(value) {
    this._severity = value;
  }

  get summary() {
    return this._summary;
  }

  set summary(value) {
    this._summary = value;
  }

  get detail() {
    return this._detail;
  }

  set detail(value) {
    this._detail = value;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  set errorCode(value: string) {
    this._errorCode = value;
  }

  get statusCode(): string {
    return this._statusCode;
  }

  set statusCode(value: string) {
    this._statusCode = value;
  }

  get isScreenAlert(): boolean {
    return <boolean>this._isScreenAlert;
  }

  set isScreenAlert(value: boolean) {
    this._isScreenAlert = value;
  }
}
