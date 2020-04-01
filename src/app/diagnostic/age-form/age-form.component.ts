import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';

@Component({
  selector: 'app-age-form',
  templateUrl: './age-form.component.html',
  styleUrls: ['./age-form.component.scss']
})
export class AgeFormComponent {
  @Output() answerEmitter = new EventEmitter();

  constructor() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let answer: Answer = {
        label: form.value.age.toString()
      };

      this.answerEmitter.emit(answer);
    }
  }
}
