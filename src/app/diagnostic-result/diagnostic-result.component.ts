import { Component, OnInit, Input } from '@angular/core';
import { IMapSurvey } from '../shared/models/question.model';

@Component({
  selector: 'app-diagnostic-result',
  templateUrl: './diagnostic-result.component.html',
  styleUrls: ['./diagnostic-result.component.scss']
})
export class DiagnosticResultComponent implements OnInit {

  @Input() surveyResults: IMapSurvey;

  constructor() { }

  ngOnInit() {
  }

}
