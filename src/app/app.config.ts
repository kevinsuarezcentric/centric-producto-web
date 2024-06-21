import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { MaterialModule } from './material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { InterceptedHttp } from './shared/interceptor/intercepted.http';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      MaterialModule,
      BrowserAnimationsModule,
      HttpClientModule,
      TablerIconsModule.pick(TablerIcons),
      TablerIconsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptedHttp,
      deps: [],
      multi: true,
    },
  ]
};



export interface AppSettings {
  dir: 'ltr' | 'rtl';
  theme: string;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  boxed: boolean;
  horizontal: boolean;
  activeTheme: string;
  language: string;
  cardBorder: boolean;
  navPos: 'side' | 'top';
}

export const defaults: AppSettings = {
  dir: 'ltr',
  theme: 'light',
  sidenavOpened: false,
  sidenavCollapsed: false,
  boxed: true,
  horizontal: false,
  cardBorder: false,
  activeTheme: 'blue_theme',
  language: 'es-ec',
  navPos: 'side',
};
