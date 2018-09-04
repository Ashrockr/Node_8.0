import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import FormUtils from "../utils/FormUtils";
import { LoginService } from "./login.service";
import { User } from "../user.model";

var sd = String;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers:[LoginService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(private loginService : LoginService){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required, 
                Validators.email
            ]),
            password: new FormControl(null, [Validators.required,Validators.minLength(6)])
        });
    }
    get formControl(){
        return this.loginForm.controls;
    }

    isFieldInvalid(formControl:FormControl){
        return FormUtils.isFieldInvalid(formControl);
    }
    onSubmit(){
        if(this.loginForm.invalid){
            return FormUtils.validateAllFields(this.loginForm);
        }
        const user = new User(
            null,
            this.loginForm.value.name,
            this.loginForm.value.email,
            this.loginForm.value.password,
            this.loginForm.value.gender);
        this.loginService.login(user)
        .subscribe(
            data => {
                console.log(data);
            },
            error => console.log(error)
        );
        this.loginForm.reset();
    }
}