// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {environment} from "../../../environment/environment";



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<boolean> {
    const url = `${environment.BACKEND_URL}/account/validateToken?token=${token}`;

    return this.http.post<any>(url, {}).pipe(
      map((res:any) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.token);
          return true;
        } else {
          localStorage.setItem('token', '');
          return false;
        }
      }),
      catchError((error:any) => {
        localStorage.setItem('token', '');
        return of(false);
      })
    );
  }
}
