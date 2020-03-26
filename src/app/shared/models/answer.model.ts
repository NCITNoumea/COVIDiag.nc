import { QuestionId } from './question.model';

export interface Answer {
    label: string;
}

export enum AnswerType {
    Binary,
    Multiple,
    Temperature,
    Age,
    Poids,
    Taille,
    PostalCode,
    Contact,
    None
}

export class AnsweredQuestion {
    id: QuestionId;
    nextQuestionId: QuestionId;
    questionLabel: string;
    answerLabel: string;
  
    constructor(id: QuestionId, nextQuestionId: QuestionId, questionLabel: string, answerLabel: string) {
      this.id = id;
      this.nextQuestionId = nextQuestionId;
      this.answerLabel = answerLabel;
      this.questionLabel = questionLabel;
    }
  }
  