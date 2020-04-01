import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';

@Component({
  selector: 'app-poids-form',
  templateUrl: './poids-form.component.html',
  styleUrls: ['./poids-form.component.scss']
})
export class PoidsFormComponent {
  @Output() answerEmitter = new EventEmitter();

  constructor() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let answer: Answer = {
        label: form.value.poids.toString()
      };

      this.answerEmitter.emit(answer);
    }
  }
}
