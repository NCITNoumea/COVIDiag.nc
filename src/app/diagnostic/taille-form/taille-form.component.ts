import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';

@Component({
  selector: 'app-taille-form',
  templateUrl: './taille-form.component.html',
  styleUrls: ['./taille-form.component.scss']
})
export class TailleFormComponent {
  @Output() answerEmitter = new EventEmitter();

  constructor() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let answer: Answer = {
        label: form.value.taille.toString()
      };

      this.answerEmitter.emit(answer);
    }
  }
}
