import { Directive, Input, SimpleChanges } from "@angular/core";
import { NG_VALIDATORS, AbstractControl } from "@angular/forms";

@Directive({
  selector: "[rgpdRequiredIf]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RgpdRequiredIfDirective,
      multi: true
    }
  ]
})
export class RgpdRequiredIfDirective {
  @Input("rgpdRequiredIf")
  rgpdRequiredIf: boolean;

  validate(c: AbstractControl) {
    let value = c.value;
    if (
      (value == null || value == undefined || value == "") &&
      this.rgpdRequiredIf
    ) {
      return {
        rgpdRequiredIf: { condition: this.rgpdRequiredIf }
      };
    }
    return null;
  }

   registerOnValidatorChange(fn: () => void): void {
      this._onChange = fn; 
   }
 
    private _onChange: () => void;

    ngOnChanges(changes: SimpleChanges): void {
        if ('rgpdRequiredIf' in changes) {
          if (this._onChange) this._onChange();
        }
    }
}
