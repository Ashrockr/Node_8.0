import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";


import FormUtils from "../utils/FormUtils";
import { User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";
import { DialogService } from "../dialogs/dialog.service";
import { Dialog } from "../models/dialog";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    signUpForm: FormGroup;

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
        this.signUpForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            gender: new FormControl(null, Validators.required)
        });
    }
    get formControl() {
        return this.loginForm.controls;
    }

    get signUpFormControl() {
        return this.signUpForm.controls;
    }

    isFieldInvalid(formControl: FormControl) {
        return FormUtils.isFieldInvalid(formControl);
    }
    login() {
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
            this.loginForm.value.gender,false,null);
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
    signup() {
        if (this.signUpForm.invalid) {
            return FormUtils.validateAllFields(this.signUpForm);
        }
        var dialog = new Dialog('Logging In', 'Please Wait');
        this.dialogService.showDialogWithProgressBar(dialog);
        const user = new User(
            null,
            this.signUpForm.value.name,
            this.signUpForm.value.email,
            this.signUpForm.value.password,
            this.signUpForm.value.gender, false,null);
        this.authService.signUp(user)
            .subscribe(
                data => {
                    this.signUpUser(data);
                },
                error => {
                    this.dialogService.closeDialogs();
                    dialog = new Dialog('Error', error.message);
                    this.dialogService.showDialog(dialog);
                    this.signUpForm.reset();
                }
            );
    }

    signUpUser(data) {
        var token = data['token'];
        var user = new User(data._id, data.name, data.email, null, data.gender, data.isAdmin,data.avatar);
        //save the token 
        localStorage.setItem('jwt-token', token);
        localStorage.setItem('role', 'ROLE_OTHER');
        localStorage.setItem('user', JSON.stringify(user));
        //re-route the user
        this.router.navigate(['/user']);
        this.dialogService.closeDialogs();

    }

    loginUser(data) {
        var token = data.token;
        var user = new User(data._id,data.name,data.email,null,data.gender,false,data.avatar);
        localStorage.setItem('user', JSON.stringify(user));
        //save the token 
        localStorage.setItem('jwt-token', token);
        if (data.isAdmin == true)
            localStorage.setItem('role', 'ROLE_ADMIN');
        else
            localStorage.setItem('role', 'ROLE_OTHER');
        //re-route the user
        if (data.isAdmin) { // admin page
            this.router.navigate(['/admin']);
            this.dialogService.closeDialogs();
        }
        else {
            this.router.navigate(['/user']);
            this.dialogService.closeDialogs();
        }

    }

    getIndex(){
        if(this.router.url == '/login'){
            return 0;
        }
        else return 1;
    }
}