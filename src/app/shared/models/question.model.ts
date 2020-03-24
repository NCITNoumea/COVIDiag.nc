import { AnswerType, Answer } from './answer.model';

export type ISurvey = Array<IIndexedQuestion>;

export interface IIndexedQuestion {
  index: number;
  question: Question;
  answer: string;
}

export class Question {
  constructor(
    public readonly id: QuestionId,
    public readonly question: string,
    public readonly answerType: AnswerType,
    public readonly answers: Array<Answer>,
    public readonly nextQuestionId: QuestionId
  ) {}
}

/**
 * Possible values for a node id.
 */
export type QuestionId =
  | 'fievre'
  | 'temperature'
  | 'toux'
  | 'gout_odorat'
  | 'maladie_cardiaque'
  | 'diabetique'
  | 'cancer'
  | 'maladie_respiratoire'
  | 'insuffisance_renale'
  | 'maladie_foie'
  | 'enceinte'
  | 'maladie_immunitaire'
  | 'immunosuppresseurs'
  | 'age'
  | 'taille'
  | 'poids'
  | 'code_postal'
  | 'mal_gorge'
  | 'diarrhee'
  | 'fatigue_inhabituelle'
  | 'repos_demi_journee'
  | 'impossibilite_alimentation'
  | 'manque_souffle_inhabituel'
  ;

/**
 * Questionnaire
 */
export const questionnaire_length = 23;
export const questionnaire = {
    fievre: new Question(
        'fievre',
        'Pensez-vous avoir ou avoir eu de la fièvre ces derniers jours (frissons, sueurs) ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'temperature'
    ),
    temperature: new Question(
        'temperature',
        'Quelle est votre température corporelle ?',
        AnswerType.Temperature,
        [ { label: 'Valider' } ],
        'toux'
    ),
    toux: new Question(
        'toux',
        'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'gout_odorat'
    ),
    gout_odorat: new Question(
        'gout_odorat',
        'Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'mal_gorge'
    ),
    mal_gorge: new Question(
        'mal_gorge',
        'Ces derniers jours, avez-vous un mal de gorge ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'diarrhee'
    ),
    diarrhee: new Question(
        'diarrhee',
        'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles. ',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'fatigue_inhabituelle'
    ),
    fatigue_inhabituelle: new Question(
        'fatigue_inhabituelle',
        'Ces derniers jours, avez-vous une fatigue inhabituelle ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'repos_demi_journee'
    ),
    repos_demi_journee: new Question(
        'repos_demi_journee',
        'Cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'impossibilite_alimentation'
    ),
    impossibilite_alimentation: new Question(
        'impossibilite_alimentation',
        'Êtes vous dans l\'impossibilité de vous alimenter ou de boire depuis 24 heures ou plus?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'manque_souffle_inhabituel'
    ),
    manque_souffle_inhabituel: new Question(
        'manque_souffle_inhabituel',
        'Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'age'
    ),
    age: new Question(
        'age',
        'Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique. ',
        AnswerType.Age,
        [ { label: 'Continuer' } ],
        'taille'
    ),
    taille: new Question(
        'taille',
        'Quel est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection. ',
        AnswerType.Taille,
        [ { label: 'Continuer' } ],
        'poids'
    ),
    poids: new Question(
        'poids',
        'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',
        AnswerType.Poids,
        [ { label: 'Continuer' } ],
        'maladie_cardiaque'
    ),
    maladie_cardiaque: new Question(
        'maladie_cardiaque',
        'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez vous un traitement à visée cardiologique ?',
        AnswerType.Multiple,
        [ { label: 'Oui' }, { label: 'Non' }, { label: 'Ne sais pas' } ],
        'diabetique'
    ),
    diabetique: new Question(
        'diabetique',
        'Êtes-vous diabétique ? ',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'cancer'
    ),
    cancer: new Question(
        'cancer',
        'Avez-vous ou avez-vous eu un cancer ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'maladie_respiratoire'
    ),
    maladie_respiratoire: new Question(
        'maladie_respiratoire',
        'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'insuffisance_renale'
    ),
    insuffisance_renale: new Question(
        'insuffisance_renale',
        'Avez-vous une insuffisance rénale chronique dialysée ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'maladie_foie'
    ),
    maladie_foie: new Question(
        'maladie_foie',
        'Avez-vous une maladie chronique du foie ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'enceinte'
    ),
    enceinte: new Question(
        'enceinte',
        'Êtes-vous enceinte ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' }, { label: 'Non applicable' } ],
        'maladie_immunitaire'
    ),
    maladie_immunitaire: new Question(
        'maladie_immunitaire',
        'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' }, { label: 'Ne sais pas' } ],
        'immunosuppresseurs'
    ),
    immunosuppresseurs: new Question(
        'immunosuppresseurs',
        'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'code_postal'
    ),
    code_postal: new Question(
        'code_postal',
        'Quel est votre code postal ? Cette information nous permet de réaliser un suivi épidémiologique',
        AnswerType.PostalCode,
        [ { label: 'Continuer' } ],
        null
    )
};
