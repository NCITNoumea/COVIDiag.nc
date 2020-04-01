import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';

@Component({
  selector: 'app-code-postal-form',
  templateUrl: './code-postal-form.component.html',
  styleUrls: ['./code-postal-form.component.scss']
})
export class CodePostalFormComponent {
  @Output() answerEmitter = new EventEmitter();

  input: NgModel;

  constructor() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let answer: Answer = {
        label: ''
      };

      if (form.value.codePostal != undefined) {
        answer.label = form.value.codePostal;
      }

      this.answerEmitter.emit(answer);
    }
  }
}
