import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ISurvey, Question, questionnaire, questionnaire_length } from '../shared/models/question.model';
import { Answer, AnswerType, AnsweredQuestion } from '../shared/models/answer.model';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {
  public surveyResults: ISurvey;
  public currentQuestion: Question;
  public currentQuestionId: number;
  public surveyLength: number;
  public surveyFinished: boolean;

  public inputTemperature: number;
  public inputAge: number;
  public inputTaille: number;
  public inputPoids: number;
  public inputPostalCode: string;

  @Output() answerEvent = new EventEmitter<AnsweredQuestion>();

  constructor() { }

  ngOnInit() {
    this.reset();
  }

  public reset() {
    this.surveyResults = [];
    this.surveyFinished = false;
    this.currentQuestionId = 0;
    this.inputTemperature = 37.5;
    this.currentQuestion = Object.assign({}, questionnaire.fievre);
    this.surveyLength = questionnaire_length;
  }

  onClick(answer: Answer) {
    const oldQuestion = this.currentQuestion;
    this.pushNode(this.currentQuestion, answer);

    this.currentQuestionId++;

    let nextQuestionId;
    if (this.currentQuestion.nextQuestionId == null) {
      nextQuestionId = null;
      // Fin du questionnaire
      console.log(this.surveyResults);
      this.surveyFinished = true;
    } else {
      nextQuestionId = oldQuestion.nextQuestionId;
      this.currentQuestion = Object.assign({}, questionnaire[oldQuestion.nextQuestionId]);
    }

    const answeredQuestion = new AnsweredQuestion(
      oldQuestion.id,
      nextQuestionId,
      oldQuestion.question,
      answer.label
    );

    this.answerEvent.emit(answeredQuestion);
  }

  private pushNode(question: Question, answer: Answer): void {
    let answerValue: string = "";

    if (this.isAnswerOnClick(question)) {
      answerValue = answer.label
    } else {
      switch (question.answerType) {
        case AnswerType.Temperature:
          answerValue = this.inputTemperature.toString();
          break;

        case AnswerType.Age:
          answerValue = this.inputAge.toString();
          break;

        case AnswerType.Poids:
          answerValue = this.inputPoids.toString();
          break;

        case AnswerType.Taille:
          answerValue = this.inputTaille.toString();
          break;

        case AnswerType.PostalCode:
          answerValue = this.inputPostalCode;
          break;
      }
    }

    this.surveyResults.push({
      index: this.surveyResults.length,
      question: this.currentQuestion,
      answer: answerValue
    });
  }

  public backToPrevious(currentQuestionIndex: number) {
    let questionIndex = currentQuestionIndex-1;
    const newQuestion = this.surveyResults.find(question => question.index === questionIndex);
    this.surveyResults.length = questionIndex;
    this.currentQuestion = Object.assign({}, questionnaire[newQuestion.question.id]);
    this.currentQuestionId--;
    this.surveyFinished = false;
  }

  public isAnswerOnClick(question: Question): boolean {
    return question.answerType === AnswerType.Binary || question.answerType === AnswerType.Multiple;
  }

  public isTemperature(question: Question): boolean {
    return question.answerType === AnswerType.Temperature;
  }

  public isAge(question: Question): boolean {
    return question.answerType === AnswerType.Age;
  }

  public isPoids(question: Question): boolean {
    return question.answerType === AnswerType.Poids;
  }

  public isTaille(question: Question): boolean {
    return question.answerType === AnswerType.Taille;
  }

  public isPostalCode(question: Question): boolean {
    return question.answerType === AnswerType.PostalCode;
  }

  public showParacetamolOnly(question: Question): boolean {
    return question.id === 'fievre' || question.id === 'temperature' || question.id === 'toux' || question.id === 'mal_gorge';
  }

}
