import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

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
    this.processMode = SurveyRecommendationProcessMode.Categories;

    this.processLocalNumber();
    this.processSurveyRecommendation();
    this.sendEmailToDASS();
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

    // Calcul des éléments saisis (input)
    this.processInputResults();

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
          if (this.nbGravitySigns > 0) {
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

  private processInputResults() {
    // IMC
    let heightAnswer: IIndexedQuestion = this.surveyResults.get('taille');
    let weightAnswer: IIndexedQuestion = this.surveyResults.get('poids');
    if (heightAnswer != undefined && weightAnswer != undefined) {
      let heightInMeters: number = (+heightAnswer.answer)/100;
      let weightInKg: number = +weightAnswer.answer;

      // IMC = Poids / Taille au carré
      let IMC: number = weightInKg / (heightInMeters * heightInMeters);

      // Si IMC >= 40 (obésité morbide) : facteur de rique en plus
      if (IMC >= 40) {
        console.log("IMC >= 40 => Facteur de risque supplémentaire");
        this.nbRiskFactors++;
      }
    }

    // Age > 70
    let ageAnswer: IIndexedQuestion = this.surveyResults.get('age');
    if (ageAnswer != undefined) {
      let age: number = +ageAnswer.answer;

      // Si IMC >= 40 (obésité morbide) : facteur de rique en plus
      if (age >= 70) {
        console.log("Age >= 70 => Facteur de risque supplémentaire");
        this.nbRiskFactors++;
      }
    }
  }

  private sendEmailToDASS() {
    // TODO - Envoyer un e-mail à la DASS si le contact est renseigné (mettre l'email dans les variables d'environnement)
  }

  private storeResultsToDatastore() {
    var db = firebase.firestore();

    // On supprime le contact pour ne pas le stocker en BDD
    let contactIndexedQuestion: IIndexedQuestion = this.surveyResults.get('contact');
    this.surveyResults.delete('contact');
    this.surveyResults.set('contact_renseigne', {
      index: contactIndexedQuestion.index,
      question: null,
      answer: contactIndexedQuestion.answer != undefined ? 'Oui' : 'Non'
    });

    // Conversion de la Map de réponses en objet
    let surveyResultsObject = Array.from(this.surveyResults).reduce((obj, [key, value]) => {
      if (value != undefined) {
        if (value.answer == undefined) {
          value.answer = "";
        }
      }
      obj[key] = value != undefined ? value : "";
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
        console.log("Formulaire soumis avec succès !");
      })
      .catch(function(error) {
        console.error("Erreur lors de la soumission du formulaire : ", error);
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
