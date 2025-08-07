/// <reference types="@angular/localize" />

import localeAr from '@angular/common/locales/ar';
import localeEn from '@angular/common/locales/en';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeAr, 'ar');
registerLocaleData(localeEn, 'en');

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

