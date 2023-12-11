import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor( private router: Router) {}

    canActivate(): boolean {
        if (localStorage.getItem("token")) {
            return true;
        } else {
            // If there is no valid token, redirect to the login page
            this.router.navigate(['/signIn']);
            return false;
        }
    }
}
