import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';

@Component({
  selector: 'app-temperature-form',
  templateUrl: './temperature-form.component.html',
  styleUrls: ['./temperature-form.component.scss']
})
export class TemperatureFormComponent implements OnInit {
  @Output() answerEmitter = new EventEmitter();

  defaultTemperature: number;

  constructor() { }

  ngOnInit() {
    this.defaultTemperature = 37.5;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let answer: Answer = {
        label: form.value.temperature.toString()
      };

      this.answerEmitter.emit(answer);
    }
  }
}
