import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Question, questionnaire, IIndexedQuestion, IMapSurvey, QuestionId } from '../shared/models/question.model';
import { Answer, AnswerType, AnsweredQuestion } from '../shared/models/answer.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {
  public surveyResults: IMapSurvey;
  public currentQuestion: Question;
  public currentQuestionNumber: number;
  public surveyLength: number;
  public surveyFinished: boolean;

  public surveyScore: number;
  public nbGravitySigns: number;
  public nbRiskFactors: number;
  public nbClinicSigns: number;

  @Output() answerEvent = new EventEmitter<AnsweredQuestion>();

  constructor() { }

  ngOnInit() {
    this.reset();
  }

  public reset() {
    this.surveyResults = new Map();
    this.surveyFinished = false;

    this.surveyScore = 0;
    this.nbGravitySigns = 0;
    this.nbRiskFactors = 0;
    this.nbClinicSigns = 0;

    this.currentQuestionNumber = 1;
    this.currentQuestion = Object.assign({}, questionnaire.fievre);

    var questionnaireArray = Object.keys(questionnaire).map(function(questionId){
        let question = questionnaire[questionId];
        return question;
    });
    this.surveyLength = questionnaireArray.length;
  }

  onClick(answer: Answer) {
    const oldQuestion = this.currentQuestion;
    this.pushNode(this.currentQuestion, answer);

    this.currentQuestionNumber++;

    let nextQuestionId;
    if (this.currentQuestion.nextQuestionId == null) {
      // Fin du questionnaire
      nextQuestionId = null;
      this.surveyFinished = true;
    } else {
      // Suite du questionnaire
      nextQuestionId = oldQuestion.nextQuestionId;
      this.currentQuestion = Object.assign({}, questionnaire[oldQuestion.nextQuestionId]);
    }

    // Tests locaux uniquement - Pour n'afficher qu'une seule question
    //this.surveyFinished = true;

    const answeredQuestion = new AnsweredQuestion(
      oldQuestion.id,
      nextQuestionId,
      oldQuestion.question,
      answer.label
    );

    this.answerEvent.emit(answeredQuestion);
  }

  private pushNode(question: Question, answer: Answer): void {
    this.surveyResults.set(
      this.currentQuestion.id,
      {
        index: this.surveyResults.size,
        question: this.currentQuestion,
        answer: answer.label
      }
    );

    this.processQuestionToRecommendationResults(question, answer);
  }

  private processQuestionToRecommendationResults(question: Question, answer: Answer): void {
    // Calcul des points et catégorisation
    if (answer.label.toLocaleLowerCase() == 'oui') {
      this.surveyScore += question.points;

      if (question.categoryId == 'signe_gravite' || question.categoryId == 'critere_isolement_sanitaire') {
        this.nbGravitySigns++;
      }
      if (question.categoryId == 'facteurs_risque') {
        this.nbRiskFactors++;
      }
      if (question.categoryId == 'signe_clinique') {
        this.nbClinicSigns++;
      }

      console.log("Score : " + this.surveyScore
                  + " / Signes gravité : " + this.nbGravitySigns
                  + " / Facteurs de risque : " + this.nbRiskFactors
                  + " / Signes cliniques : " + this.nbClinicSigns
      );
    }
  }

  private unprocessIndexedQuestionToRecommendationResults(indexedQuestion: IIndexedQuestion): void {
    // Calcul des points et catégorisation
    if (indexedQuestion.answer.toLocaleLowerCase() == 'oui') {
      let question: Question = indexedQuestion.question;

      this.surveyScore -= question.points;

      if (question.categoryId == 'signe_gravite' || question.categoryId == 'critere_isolement_sanitaire') {
        this.nbGravitySigns--;
      }
      if (question.categoryId == 'facteurs_risque') {
        this.nbRiskFactors--;
      }
      if (question.categoryId == 'signe_clinique') {
        this.nbClinicSigns--;
      }

      console.log("Score : " + this.surveyScore
                  + " / Signes gravité : " + this.nbGravitySigns
                  + " / Facteurs de risque : " + this.nbRiskFactors
                  + " / Signes cliniques : " + this.nbClinicSigns
      );
    }
  }

  public backToPrevious(question: Question) {
    let lastQuestionId: QuestionId = Array.from(this.surveyResults)[this.surveyResults.size-1][0];
    let lastIndexedQuestion: IIndexedQuestion = Array.from(this.surveyResults)[this.surveyResults.size-1][1];

    this.unprocessIndexedQuestionToRecommendationResults(lastIndexedQuestion);

    this.currentQuestion = Object.assign({}, questionnaire[lastIndexedQuestion.question.id]);
    this.surveyResults.delete(lastQuestionId);

    this.currentQuestionNumber--;
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

  public isContact(question: Question): boolean {
    return question.answerType === AnswerType.Contact;
  }

  public showParacetamolOnly(question: Question): boolean {
    return question.id === 'fievre' || question.id === 'temperature' || question.id === 'toux' || question.id === 'mal_gorge';
  }

}
