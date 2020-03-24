import { Component, OnInit, Input } from '@angular/core';
import { ISurvey, IIndexedQuestion } from 'src/app/shared/models/question.model';
import { RecommendationType } from 'src/app/shared/models/recommendation.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  @Input() surveyResults: ISurvey;

  public recommendationResult: RecommendationType;
  public localNumber: string;

  constructor() { }

  ngOnInit() {
    this.processLocalNumber();
    this.processSurveyRecommendation();
  }

  private processLocalNumber(){
    const surveyLength = this.surveyResults.length;

    // Valeur par défaut
    this.localNumber = "05 02 02";

    // Code postal en dernier
    let postalCodeAnswer: IIndexedQuestion = this.surveyResults[surveyLength-1];
    let strPostalCode: string = postalCodeAnswer.answer;
    let postalCode: number = +strPostalCode;

    console.log(postalCodeAnswer);
    console.log(strPostalCode);
    console.log(postalCode);

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

    console.log(this.localNumber);
  }

  private processSurveyRecommendation(){
    // Valeur par défaut
    this.recommendationResult = RecommendationType.Appeler15;

    //TODO - this.recommendationResult = RecommendationType.AppelerNumeroLocal;
  }

  public isMedipole(): boolean {
    return this.recommendationResult === RecommendationType.Medipole;
  }

  public isAppeler15(): boolean {
    return this.recommendationResult === RecommendationType.Appeler15;
  }

  public isAppelerNumeroLocal(): boolean {
    return this.recommendationResult === RecommendationType.AppelerNumeroLocal;
  }

  public isAppelerMedecin(): boolean {
    return this.recommendationResult === RecommendationType.AppelerMedecin;
  }

  public isRAS(): boolean {
    return this.recommendationResult === RecommendationType.RAS;
  }

}
