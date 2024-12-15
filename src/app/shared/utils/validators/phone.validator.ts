import { AbstractControl } from "@angular/forms";

export function phoneValidatorNumber(control:AbstractControl){
    const validPhone = /^[0-9]{8,18}$/.test(control.value) 
    return validPhone ? null:{'inValidPhone' : {value: control.value }}
}