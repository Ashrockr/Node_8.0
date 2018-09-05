import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { JwtHelper } from 'angular2-jwt'
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = route.data['role'];
        const userRole = localStorage.getItem('role');
        var token = localStorage.getItem('jwt-token');

        if (token) {
            let jwtHelper: JwtHelper = new JwtHelper();
            const isTokenAlive = !jwtHelper.isTokenExpired(token);
            if (isTokenAlive) {
                if (userRole == 'ROLE_ADMIN' && role == 'ROLE_ADMIN') {
                    // logged in so return 
                    return true;
                }
                else if (userRole == 'ROLE_OTHER' && role == 'ROLE_OTHER') {
                    return true;
                }
                else if (userRole == 'ROLE_ADMIN' && role == 'ROLE_OTHER') {
                    this.router.navigate(['/admin']);
                    return false;
                }
                else if (userRole == 'ROLE_OTHER' && role == 'ROLE_ADMIN') {
                    this.router.navigate(['/user']);
                    return false;
                }
            }
        }
        // not logged in so redirect to login page
        this.authService.logOut();
        this.router.navigate(['/login']);
    }
}