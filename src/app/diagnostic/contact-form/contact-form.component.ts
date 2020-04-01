import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Output() answerEmitter = new EventEmitter();

  inputContact: NgModel;
  inputRgpd: NgModel;

  constructor() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let answer: Answer = {
        label: ''
      };

      if (form.value.contact != undefined) {
        answer.label = form.value.contact;
      }

      this.answerEmitter.emit(answer);
    }
  }
}
