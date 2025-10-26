import {
  ApplicationConfig, inject, provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideTranslateService, TranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import {defaultLanguage} from './components/language-selector/language-switcher.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: environment.firstPath + '/assets/i18n/',
        suffix: '.json'
      })
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      let savedLang: string | null = null;
      if (typeof window !== 'undefined') {
        savedLang = window.localStorage.getItem('lang');
        translate.use(savedLang ?? defaultLanguage.code);
      }
    })

  ],
};
