import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  return next(req).pipe(
    tap({
      error: (err) => {
        snackbar.open(err.message, 'close', {
          duration: 5000,
        });
      },
    }),
  );
};
