import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import FormUtils from "../utils/FormUtils";

var sd = String;
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
    signUpForm : FormGroup;

    ngOnInit(){
        this.signUpForm  = new FormGroup({
            name : new FormControl(null,Validators.required),
            email : new FormControl(null,[Validators.required,Validators.email]),
            password : new FormControl(null,[Validators.required,Validators.minLength(6)]),
            gender : new FormControl(null,Validators.required)
        });
    }

    get formControl(){
        return this.signUpForm.controls;
    }

    isFieldInvalid(formControl:FormControl){
        return FormUtils.isFieldInvalid(formControl);
        
    }
    onSubmit(){
        if(this.signUpForm.invalid){
            return FormUtils.validateAllFields(this.signUpForm);
        }
        console.log(this.signUpForm);
    }
}