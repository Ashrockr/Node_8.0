import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { CONFIGS } from "../configs";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ViewUsersService {

    constructor(private http: Http, private authService: AuthService) { }

    url = CONFIGS.apiURL;
    allUser
    viewAllUser() {
        var token = this.authService.getToken();
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.url + '/allUser?token=' + token, { headers: header })
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }
    getUserCount() {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.url + '/getUsersCount', { headers: header })
            .map((res: Response) =>  res.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }

    getUsers(limit: number, skip: number) {
        const header = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.url + '/allUser/' + limit + '/' + skip, { headers: header })
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }
}