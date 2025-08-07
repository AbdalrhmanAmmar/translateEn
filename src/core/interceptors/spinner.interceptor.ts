import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/helper-services/spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _SpinnerService = inject(SpinnerService);

  _SpinnerService.show();

  return next(req).pipe(
    finalize(() => {
      _SpinnerService.hide();
    })
  );
};
