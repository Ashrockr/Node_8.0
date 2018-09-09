import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/Rx';

import { User } from "../models/user.model";
import { CONFIGS } from "../configs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    user: User;

    constructor(private http: Http, private router: Router) { }

    public getToken(): string {
        return localStorage.getItem('jwt-token');
    }

    public getUser() {
        if (this.user == undefined) {
            this.user = JSON.parse(localStorage.getItem('user'));;
        }
        return this.user;
    }


    url = CONFIGS.apiURL;

    login(user: User) {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/login', JSON.stringify(user), { headers: header })
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signUp(user: User) {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/signup', JSON.stringify(user), { headers: header })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            }
            );
    }

    logOut() {
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        if (localStorage.getItem('jwt-token') && localStorage.getItem('role')) {
            return true;
        }
        return false;
    }
}