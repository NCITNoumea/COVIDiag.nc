import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ISurvey, Question, questionnaire, questionnaire_length, IIndexedQuestion } from '../shared/models/question.model';
import { Answer, AnswerType, AnsweredQuestion } from '../shared/models/answer.model';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {
  public surveyResults: ISurvey;
  public currentQuestion: Question;
  public currentQuestionNumber: number;
  public surveyLength: number;
  public surveyFinished: boolean;

  public surveyScore: number;
  public nbGravitySigns: number;
  public nbRiskFactors: number;
  public nbClinicSigns: number;

  public inputTemperature: number;
  public inputAge: number;
  public inputTaille: number;
  public inputPoids: number;
  public inputPostalCode: string;
  public inputContact: string;

  @Output() answerEvent = new EventEmitter<AnsweredQuestion>();

  constructor() { }

  ngOnInit() {
    this.reset();
  }

  public reset() {
    this.surveyResults = [];
    this.surveyFinished = false;

    this.surveyScore = 0;
    this.nbGravitySigns = 0;
    this.nbRiskFactors = 0;
    this.nbClinicSigns = 0;

    this.currentQuestionNumber = 1;
    this.inputTemperature = 37.5;
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
      console.log(this.surveyResults);
      this.surveyFinished = true;
    } else {
      // Suite du questionnaire
      nextQuestionId = oldQuestion.nextQuestionId;
      this.currentQuestion = Object.assign({}, questionnaire[oldQuestion.nextQuestionId]);
    }

    // Tests locaux uniquement - Pour n'afficher qu'une seule question
    // this.surveyFinished = true;
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

    // Récupération de la réponse
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

        case AnswerType.Contact:
          answerValue = this.inputContact;
          break;

      }
    }

    this.surveyResults.push({
      index: this.surveyResults.length,
      question: this.currentQuestion,
      answer: answerValue
    });

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

  public backToPrevious(questionNumber: number) {
    let questionIndex = questionNumber-2;
    const previousIndexedQuestion = this.surveyResults.find(question => question.index === questionIndex);
    this.unprocessIndexedQuestionToRecommendationResults(previousIndexedQuestion);

    this.surveyResults.length = questionIndex;
    this.currentQuestion = Object.assign({}, questionnaire[previousIndexedQuestion.question.id]);
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
