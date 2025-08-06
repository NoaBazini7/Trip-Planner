import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { provideHttpClient } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routeConfig),
    importProvidersFrom(NgxDaterangepickerMd.forRoot(), BrowserAnimationsModule),
    provideHttpClient(),

  ]
};
