import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

import { CONFIGS } from "../configs";
import { User } from "../user.model";

@Injectable()
export class LoginService {
    constructor(private http: Http) { }
    url = CONFIGS.apiURL + '/users/login';
    login(user: User) {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url, JSON.stringify(user), { headers: header })
            .map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error.json));
    }
}