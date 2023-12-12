import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from './service/AuthService';
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem("token")!=null){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    }
    return next.handle(request);
  }
}
