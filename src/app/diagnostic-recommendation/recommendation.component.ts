import { Component, OnInit, Input } from '@angular/core';
import * as firebase from "firebase";

import { IIndexedQuestion, IMapSurvey } from 'src/app/shared/models/question.model';
import { RecommendationType, SurveyRecommendationProcessMode } from 'src/app/shared/models/recommendation.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  @Input() surveyResults: IMapSurvey;
  @Input() surveyScore: number;
  @Input() nbGravitySigns: number;
  @Input() nbRiskFactors: number;
  @Input() nbClinicSigns: number;

  public recommendationResult: RecommendationType;
  public localNumber: string;
  public processMode: SurveyRecommendationProcessMode;

  constructor() { }

  ngOnInit() {
    console.log(this.surveyResults);

    // On défini ici le mode de calcul de la recommandation : basée sur le score ou sur les catégories de questions
    this.processMode = SurveyRecommendationProcessMode.Score;

    this.processLocalNumber();
    this.processSurveyRecommendation();
    this.storeResultsToDatastore();
  }

  private processLocalNumber(){
    // Valeur par défaut
    this.localNumber = "05 02 02";

    let postalCodeAnswer: IIndexedQuestion = this.surveyResults.get('code_postal');
    if (postalCodeAnswer != undefined) {
      let strPostalCode: string = postalCodeAnswer.answer;
      let postalCode: number = +strPostalCode;

      if (postalCode != null) {
        if (postalCode < 98809 || (postalCode > 98840 && postalCode < 98850) || (postalCode > 98850 && postalCode < 98859) || (postalCode > 98860 && postalCode < 98870) || (postalCode > 98890)) {
          // Nouméa
          this.localNumber = "05 02 02";
        } else {
          switch (postalCode) {
            case 98809:
            case 98810:
              // Mont-Dore
              this.localNumber = "05 02 02";
              break;

            case 98830:
            case 98835:
            case 98836:
            case 98837:
            case 98839:
              // Dumbea
              this.localNumber = "05 02 02";
              break;
          }
        }
      }

      console.log("Code postal " + postalCode + " => Numéro local " + this.localNumber);
    }
  }

  private processSurveyRecommendation(){
    // Valeur par défaut
    this.recommendationResult = RecommendationType.Appeler15;

    console.log("Score : " + this.surveyScore
                + " / Signes gravité : " + this.nbGravitySigns
                + " / Facteurs de risque : " + this.nbRiskFactors
                + " / Signes cliniques : " + this.nbClinicSigns
    );

    switch (this.processMode) {
      case SurveyRecommendationProcessMode.Score:
        if (this.surveyScore >= 6) {
          if (this.nbGravitySigns > 0) {
            this.recommendationResult = RecommendationType.Appeler15;
          } else {
            this.recommendationResult = RecommendationType.TestPrelevement;
          }
        } else {
          if (this.surveyScore <= 2) {
            this.recommendationResult = RecommendationType.RAS;
          } else {
            this.recommendationResult = RecommendationType.AppelerMedecin;
          }
        }
        break;

      case SurveyRecommendationProcessMode.Categories:
        if (this.nbClinicSigns > 0) {
          if (this.nbRiskFactors > 0) {
            if (this.nbGravitySigns > 0) {
              this.recommendationResult = RecommendationType.Appeler15;
            } else {
              this.recommendationResult = RecommendationType.AppelerMedecin;
            }
          } else {
            if (this.nbGravitySigns > 0) {
              this.recommendationResult = RecommendationType.Appeler15;
            } else {
              this.recommendationResult = RecommendationType.AppelerMedecin;
            }
          }
        } else {
          if (this.nbGravitySigns > 1) {
            this.recommendationResult = RecommendationType.Appeler15;
          } else {
            this.recommendationResult = RecommendationType.RAS;
          }
        }
        break;
    }

    console.log("Recommandation calculée par " + SurveyRecommendationProcessMode[this.processMode]
                + " : " + RecommendationType[this.recommendationResult]);
  }

  private storeResultsToDatastore() {
    var db = firebase.firestore();

    // Conversion de la Map de réponses en objet
    let surveyResultsObject = Array.from(this.surveyResults).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    let surveyData = {
      surveyResults: surveyResultsObject,
      surveyScore: this.surveyScore,
      nbGravitySigns: this.nbGravitySigns,
      nbRiskFactors: this.nbRiskFactors,
      nbClinicSigns: this.nbClinicSigns,
      recommendationResult: RecommendationType[this.recommendationResult],
      localNumber: this.localNumber,
      processMode: SurveyRecommendationProcessMode[this.processMode]
    }

    let id: string = this.generateId();

    db.collection("survey").doc(id).set(surveyData)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  private generateId(): string {
    let currentTime: Date = new Date();
    let currentTimezoneOffset: number = currentTime.getTimezoneOffset() * 60 * 1000;
    let currentLocalTime: number = currentTime.getTime() - currentTimezoneOffset;
    let localDate: Date = new Date(currentLocalTime);
    return localDate.toISOString();
  }

  public isAppeler15(): boolean {
    return this.recommendationResult === RecommendationType.Appeler15;
  }

  public isTestPrelevement(): boolean {
    return this.recommendationResult === RecommendationType.TestPrelevement;
  }

  public isAppelerMedecin(): boolean {
    return this.recommendationResult === RecommendationType.AppelerMedecin;
  }

  public isRAS(): boolean {
    return this.recommendationResult === RecommendationType.RAS;
  }

}
