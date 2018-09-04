import { FormGroup, FormControl } from "@angular/forms";

export default class FormUtils {
    static validateAllFields(formGroup: FormGroup) {         
        Object.keys(formGroup.controls).forEach(field => {  
            const control = formGroup.get(field);            
            if (control instanceof FormControl) {             
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        
                this.validateAllFields(control);  
            }
        });
    }
    static isFieldInvalid(formControl:FormControl):boolean{
        return formControl.errors && (formControl.dirty || formControl.touched)
    }
}