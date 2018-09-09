import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import FormUtils from "../utils/FormUtils";
import { User } from "../models/user.model";
import { AuthService } from "../auth/auth.service";
import { Dialog } from "../models/dialog";
import { DialogService } from "../dialogs/dialog.service";

var sd = String;
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    constructor(private router: Router, private authService: AuthService, private title: Title, private dialogService: DialogService) { }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            if (localStorage.getItem('role') == 'ROLE_ADMIN')
                this.router.navigate(['/admin']);
            else
                this.router.navigate(['/user']);
        }
        this.title.setTitle('SignUp');
        this.signUpForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            gender: new FormControl(null, Validators.required)
        });
    }

    get formControl() {
        return this.signUpForm.controls;
    }

    isFieldInvalid(formControl: FormControl) {
        return FormUtils.isFieldInvalid(formControl);

    }
    onSubmit() {
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
}