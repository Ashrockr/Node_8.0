import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import FormUtils from "../utils/FormUtils";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

var sd = String;
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
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
        const user = new User(
            null,
            this.signUpForm.value.name,
            this.signUpForm.value.email,
            this.signUpForm.value.password,
            this.signUpForm.value.gender);
        this.authService.signUp(user)
            .subscribe(
                data => {
                    this.signUpUser(data);
                },
                error => {
                    console.log(error);
                    this.signUpForm.reset();
                }
            );
    }
    signUpUser(data) {
        var token = data.token;
        //save the token 
        localStorage.setItem('jwt-token', token);
        //re-route the user
        this.router.navigate(['/user']);

    }
}