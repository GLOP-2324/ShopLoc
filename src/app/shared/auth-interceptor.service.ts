import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from  './service/AuthService'
import {Router} from "@angular/router";


export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router:Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (token) {
      return this.authService.validateToken(token).pipe(
        switchMap((isValidToken) => {
          if (isValidToken) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            localStorage.setItem("token","");
            window.location.href = "/signIn";
            // Redirect to login or handle accordingly
          }

          return next.handle(req);
        }),
        catchError((error) => {
          console.error('Error validating token:', error);
          // Handle error (e.g., redirect to login)
          return of(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
