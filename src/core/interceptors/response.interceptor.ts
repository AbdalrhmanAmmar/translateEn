import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpEvent,
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { NotificationService } from '../services/helper-services/notification.service';
import { AuthService } from '../services/modules-services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../current-user/user-store';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 422 || err.status === 500) {
        const errorMsg = err.error?.Error ?? 'حدث خطأ غير متوقع';
        NotificationService.fireNotification(errorMsg, false);
        return throwError(() => err);
      }

      if (err.status === 403) {
        NotificationService.fireNotification('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى', false);
        authService.logoutUser().subscribe({
          next: () => {
            UserStore.clearUser();
            router.navigate(['/login']);
          },
          error: (logoutErr) => {
            UserStore.clearUser();
            router.navigate(['/login']);
          },
        });
        return throwError(() => err);
      }

      if (err.status === 401 && UserStore.getUser()) {
        return authService.refreshUser(UserStore.getUser()!).pipe(
          switchMap(() => {
            return next(req);
          }),
          catchError((refreshErr) => {
            UserStore.clearUser();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};

