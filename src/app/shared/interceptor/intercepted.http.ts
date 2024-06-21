import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
  @BlockUI() blockUI!: NgBlockUI

  constructor(
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.startProcess()
    return next.handle(req).pipe(
      tap(
        (data: any) => {
          if (data.status) {
            this.stopProcess();
          }
        },
        (error: any) => {
          this.stopProcess();
        })
    );
  }

  /**
   * method to start the process
   */
  startProcess(): void {
    this.blockUI.start('Cargando...')
  }

  /**
   * method to stop the process
   */
  stopProcess(): void {
    this.blockUI.stop()
  }
}
