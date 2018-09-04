import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/Rx';

import { User } from "../user.model";
import { CONFIGS } from "../configs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    public getToken(): string {
        return localStorage.getItem('jwt-token');
    }

    constructor(private http: Http, private router: Router) { }

    url = CONFIGS.apiURL + '/users';

    login(user: User) {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/login', JSON.stringify(user), { headers: header })
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error.json));
    }

    signUp(user: User) {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + '/signup', JSON.stringify(user), { headers: header })
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error.json));
    }

    logOut() {
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
    }
}