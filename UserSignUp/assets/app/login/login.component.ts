import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import FormUtils from "../utils/FormUtils";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

var sd = String;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }
    get formControl() {
        return this.loginForm.controls;
    }

    isFieldInvalid(formControl: FormControl) {
        return FormUtils.isFieldInvalid(formControl);
    }
    onSubmit() {
        if (this.loginForm.invalid) {
            return FormUtils.validateAllFields(this.loginForm);
        }
        const user = new User(
            null,
            this.loginForm.value.name,
            this.loginForm.value.email,
            this.loginForm.value.password,
            this.loginForm.value.gender);
        this.authService.login(user)
            .subscribe(
                data => {
                    this.loginUser(data);
                },
                error => {
                    console.log(error);
                    this.loginForm.reset();
                }
            );
    }
    loginUser(data) {
        var token = data.token;
        //save the token 
        localStorage.setItem('jwt-token', token);
        if (data.isAdmin == true)
            localStorage.setItem('role', 'ROLE_ADMIN');
        else
            localStorage.setItem('role', 'OTHER_ROLE');
        //re-route the user
        if (data.isAdmin) { // admin page
            this.router.navigate(['/admin']);
        }
        else {
            this.router.navigate(['/user']);
        }

    }
}