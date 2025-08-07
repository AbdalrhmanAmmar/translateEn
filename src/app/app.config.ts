import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '../../src/core/interceptors/request.interceptor';
import { responseInterceptor } from '../../src/core/interceptors/response.interceptor';
import { spinnerInterceptor } from '../core/interceptors/spinner.interceptor';
import { LanguageService } from '../core/services/helper-services/language.service';

// Get current locale from localStorage or default to 'ar'
function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('esnad-language') || 'ar';
  }
  return 'ar';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        headerInterceptor,
        responseInterceptor,
        spinnerInterceptor,
      ])
    ),
    { provide: LOCALE_ID, useValue: getCurrentLocale() },
    LanguageService,
  ],
};
