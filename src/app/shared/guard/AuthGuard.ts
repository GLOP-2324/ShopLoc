import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {NgxPermissionsService} from "ngx-permissions";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor( private router: Router,private permissionsService: NgxPermissionsService) {}

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
      if (localStorage.getItem("token")) {
        const expectedPermissions = route.data['permissions']?.only;
        switch (localStorage.getItem("roleId")) {
          case "1":
            this.permissionsService.loadPermissions(['ADMIN']);
            break;
          case "2":
            this.permissionsService.loadPermissions(['COMMERCANT']);
            break;
          case "3":
            this.permissionsService.loadPermissions(['CLIENT']);
            break;
        }
        if (await this.permissionsService.hasPermission(expectedPermissions)) {
          return true;
        }
        else{
          await this.router.navigate(["/unauthorized"])
          return false;
        }
      } else {
        // If there is no valid token, redirect to the login page
        await this.router.navigate(['/signIn']);
        return false;
      }
    }
}
