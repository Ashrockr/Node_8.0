import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import FormUtils from "../utils/FormUtils";
import { User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";
import { DialogService } from "../dialogs/dialog.service";
import { Dialog } from "../models/dialog";

var sd = String;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService, private title: Title, private dialogService: DialogService) { }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            if (localStorage.getItem('role') == 'ROLE_ADMIN')
                this.router.navigate(['/admin']);
            else
                this.router.navigate(['/user']);
        }
        this.title.setTitle('Login');
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
        var dialog = new Dialog('Logging In', 'Please Wait');
        this.dialogService.showDialogWithProgressBar(dialog);
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
                    this.dialogService.closeDialogs();
                    dialog = new Dialog('Error',error.message);
                    this.dialogService.showDialog(dialog);
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
            this.dialogService.closeDialogs();
        }
        else {
            this.router.navigate(['/user']);
        }

    }
}