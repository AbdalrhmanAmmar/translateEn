import { Component, DestroyRef, inject, OnInit, signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { ColorModeService, SpinnerModule } from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
    selector: 'app-root',
    template: `
    
    @if(loading())
      {
      <div class="custom-spinner-overlay">
        <c-spinner variant="grow" color="primary"/>
      </div>
      }
    @if(!loading())
      {
            <router-outlet />
      }
              `,
    imports: [RouterOutlet, SpinnerModule],
    styles: [`
      .custom-spinner-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background:#F3F4F7;
          z-index: 99999;
          display: flex;
          justify-content: center;
          align-items: center;
}
      `]
})
export class AppComponent implements OnInit {
  title = 'اسناد';
  loading : WritableSignal<boolean> = signal(false);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor() {
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-pro-angular-admin-template-theme-light');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    this.#router.events.pipe(
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((evt) => {
        if (evt instanceof NavigationStart) {
          this.loading.set(true);
        } else if (
          evt instanceof NavigationEnd ||
          evt instanceof NavigationCancel ||
          evt instanceof NavigationError
        ) {
          this.loading.set(false);
        }
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
