import { Injectable, inject } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
  showClass: any = false;
  public currentUrl = new BehaviorSubject<any>(undefined);

  private _router = inject( Router);
  constructor() {
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }
}
