import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';
registerLocaleData(localeEs, 'es');
export const appConfig: ApplicationConfig = {
 providers: [provideRouter(routes), provideAnimationsAsync(), {provide: LOCALE_ID, useValue: 'es'}, provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
