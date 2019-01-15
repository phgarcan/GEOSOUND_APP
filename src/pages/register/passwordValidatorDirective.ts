import { Directive, Input } from '@angular/core';
import {
  AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors,
  Validator
} from '@angular/forms';


@Directive({
  selector: '[validateEqual]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateEqualDirective,
      multi: true
    }
  ]
})
export class ValidateEqualDirective implements Validator {
  @Input('validateEqual')
  password: NgModel;
  validate(control: AbstractControl): ValidationErrors | null {
    if(control.value == this.password.value ) return null;
    else{
      return {validateEqual:true};
    }//confirm password

  }
}
