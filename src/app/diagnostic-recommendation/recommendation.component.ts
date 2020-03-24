import { Component, OnInit, Input } from '@angular/core';
import { ISurvey } from 'src/app/shared/models/question.model';
import { RecommendationType } from 'src/app/shared/models/recommendation.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  @Input() surveyResults: ISurvey;

  public recommendationResult: RecommendationType;

  constructor() { }

  ngOnInit() {
    this.recommendationResult = RecommendationType.Appeler15;
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

  public isAppellerMedecin(): boolean {
    return this.recommendationResult === RecommendationType.AppelerMedecin;
  }

}
