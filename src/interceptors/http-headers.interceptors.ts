import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class HttpHeadersInterceptorsInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth');

    return next.handle(request).pipe(
			catchError((err, caught: Observable<HttpEvent<any>>) => {
				// snackbar error
				const txtError = err?.error?.message
					? err?.error?.message
					: 'Terjadi Kesalahan';
				// this.popup.openSnackBar(txtError, 'Error');
				// handle unauthorized
				if (err instanceof HttpErrorResponse && err.status == 401) {
					localStorage.clear();
					this.router.navigate(['/login']);
					return of(err as any);
				}
				throw err;
			})
		);
  }
}