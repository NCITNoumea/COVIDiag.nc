import { AnswerType, Answer } from './answer.model';

export type IMapSurvey = Map<QuestionId, IIndexedQuestion>;
export type IArraySurvey = Array<IIndexedQuestion>;

export interface IIndexedQuestion {
  index: number;
  question: Question;
  answer: string;
}

export class Question {
  constructor(
    public readonly id: QuestionId,
    public readonly categoryId: QuestionCategoryId,
    public readonly points: number,
    public readonly question: string,
    public readonly answerType: AnswerType,
    public readonly answers: Array<Answer>,
    public readonly nextQuestionId: QuestionId
  ) {}
}

/**
 * ID des questions possibles
 */
export type QuestionId =
  | 'fievre'
  | 'frissons'
  | 'temperature'
  | 'toux'
  | 'difficulte_respiratoire'
  | 'gout_odorat'
  | 'douleurs_diffuses'
  | 'douleurs_musculaires'
  | 'maladie_cardiaque'
  | 'diabetique'
  | 'cancer'
  | 'maladie_respiratoire'
  | 'insuffisance_renale'
  | 'maladie_foie'
  | 'enceinte'
  | 'maladie_immunitaire'
  | 'immunosuppresseurs'
  | 'voyage_recent'
  | 'contact_voyageur_symptomatique'
  | 'age'
  | 'taille'
  | 'poids'
  | 'code_postal'
  | 'contact'
  | 'mal_gorge'
  | 'diarrhee'
  | 'fatigue_inhabituelle'
  | 'repos_demi_journee'
  | 'impossibilite_alimentation'
  | 'manque_souffle_inhabituel'
  | 'malaise_confusion_altération_conscience'
  ;

/**
 * ID des questions possibles
 */
export type QuestionCategoryId =
  | 'signe_gravite'
  | 'facteurs_risque'
  | 'critere_isolement_sanitaire'
  | 'signe_clinique'
  | 'input'
  ;

/**
 * Questionnaire
 */
export const questionnaire = {
    fievre: new Question(
      'fievre',
      'signe_clinique',
      5,
      'Avez-vous plus de 38°c de fièvre ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'frissons'
    ),
    frissons: new Question(
      'frissons',
      'signe_clinique',
      1,
      'Avez-vous ressenti des frissons ou un épisode de sueur inhabituel ces derniers jours ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'toux'
    ),
    /*temperature: new Question(
        'temperature',
        'Quelle est votre température corporelle ?',
        AnswerType.Temperature,
        [ { label: 'Valider' } ],
        'toux'
    ),*/
    toux: new Question(
      'toux',
      'signe_clinique',
      5,
      'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'gout_odorat'
    ),
    gout_odorat: new Question(
      'gout_odorat',
      'signe_clinique',
      6,
      'Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'douleurs_diffuses'
    ),
    douleurs_diffuses: new Question(
      'douleurs_diffuses',
      'signe_clinique',
      1,
      'Ressentez-vous des douleurs diffuses dans certaines parties du corps ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'douleurs_musculaires'
    ),
    douleurs_musculaires: new Question(
      'douleurs_musculaires',
      'signe_clinique',
      1,
      'Ressentez-vous des douleurs musculaires ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'difficulte_respiratoire'
    ),
    difficulte_respiratoire: new Question(
      'difficulte_respiratoire',
      'signe_gravite',
      5,
      'Ces dernieres 24h, avez-vous noté une gène respiratoire inhabituelle ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'malaise_confusion_altération_conscience'
    ),
    malaise_confusion_altération_conscience: new Question(
      'malaise_confusion_altération_conscience',
      'signe_gravite',
      5,
      'Ces derniers jours, avez-vous fait un ou plusieurs malaises ? Votre entourage a t\'il observé une confusion chez vous ces derniers jours ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'impossibilite_alimentation'
    ),
    impossibilite_alimentation: new Question(
      'impossibilite_alimentation',
      'signe_gravite',
      5,
      'Êtes vous dans l\'impossibilité de vous alimenter ou de boire depuis 24 heures ou plus ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'fatigue_inhabituelle'
    ),
    /*mal_gorge: new Question(
      'mal_gorge',
      'signe_clinique',
      1,
      'Ces derniers jours, avez-vous un mal de gorge ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'diarrhee'
    ),*/
    /*diarrhee: new Question(
      'diarrhee',
      'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles. ',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'fatigue_inhabituelle'
    ),*/
    fatigue_inhabituelle: new Question(
      'fatigue_inhabituelle',
      'signe_clinique',
      1,
      'Ces derniers jours, avez-vous ressenti une fatigue inhabituelle et intense ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'voyage_recent'
    ),
    /*repos_demi_journee: new Question(
        'repos_demi_journee',
        'Cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'impossibilite_alimentation'
    ),*/
    /*manque_souffle_inhabituel: new Question(
        'manque_souffle_inhabituel',
        'Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',
        AnswerType.Binary,
        [ { label: 'Oui' }, { label: 'Non' } ],
        'age'
    ),*/
    voyage_recent: new Question(
      'voyage_recent',
      'facteurs_risque',
      5,
      'Avez vous voyagé en dehors de Nouvelle-Calédonie lors des 15 derniers jours ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'contact_voyageur_symptomatique'
    ),
    contact_voyageur_symptomatique: new Question(
      'contact_voyageur_symptomatique',
      'facteurs_risque',
      5,
      'Sur les 15 derniers jours, avez vous été en contact avec une personne rentrée de l\'étranger et présentant des  signes grippaux ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'age'
    ),
    age: new Question(
      'age',
      'input',
      0,
      'Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique. ',
      AnswerType.Age,
      [ { label: 'Continuer' } ],
      'taille'
    ),
    taille: new Question(
      'taille',
      'input',
      0,
      'Quel est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection. ',
      AnswerType.Taille,
      [ { label: 'Continuer' } ],
      'poids'
    ),
    poids: new Question(
      'poids',
      'input',
      0,
      'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',
      AnswerType.Poids,
      [ { label: 'Continuer' } ],
      'maladie_cardiaque'
    ),
    maladie_cardiaque: new Question(
      'maladie_cardiaque',
      'facteurs_risque',
      0,
      'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez vous un traitement à visée cardiologique ?',
      AnswerType.Multiple,
      [ { label: 'Oui' }, { label: 'Non' }, { label: 'Ne sais pas' } ],
      'diabetique'
    ),
    diabetique: new Question(
      'diabetique',
      'facteurs_risque',
      0,
      'Êtes-vous diabétique ? ',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'cancer'
    ),
    cancer: new Question(
      'cancer',
      'facteurs_risque',
      0,
      'Avez-vous ou avez-vous eu un cancer ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'maladie_respiratoire'
    ),
    maladie_respiratoire: new Question(
      'maladie_respiratoire',
      'facteurs_risque',
      0,
      'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'insuffisance_renale'
    ),
    insuffisance_renale: new Question(
      'insuffisance_renale',
      'facteurs_risque',
      0,
      'Avez-vous une insuffisance rénale chronique dialysée ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'maladie_foie'
    ),
    maladie_foie: new Question(
      'maladie_foie',
      'facteurs_risque',
      0,
      'Avez-vous une maladie chronique du foie ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'enceinte'
    ),
    enceinte: new Question(
      'enceinte',
      'facteurs_risque',
      0,
      'Êtes-vous enceinte de plus de 5 mois ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' }, { label: 'Non applicable' } ],
      'maladie_immunitaire'
    ),
    maladie_immunitaire: new Question(
      'maladie_immunitaire',
      'facteurs_risque',
      0,
      'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' }, { label: 'Ne sais pas' } ],
      'immunosuppresseurs'
    ),
    immunosuppresseurs: new Question(
      'immunosuppresseurs',
      'facteurs_risque',
      0,
      'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).',
      AnswerType.Binary,
      [ { label: 'Oui' }, { label: 'Non' } ],
      'contact'
    ),
    contact: new Question(
      'contact',
      'input',
      0,
      'Merci de nous transmettre un moyen de contact valide (téléphone ou e-mail). Les services sanitaires pourront ainsi prendre contact avec vous si cela s\'avèrait nécessaire.',
      AnswerType.Contact,
      [ { label: 'Continuer' } ],
      'code_postal'
    ),
    code_postal: new Question(
      'code_postal',
      'input',
      0,
      'Quel est votre code postal ? Cette information nous permet de réaliser un suivi épidémiologique',
      AnswerType.PostalCode,
      [ { label: 'Continuer' } ],
      null
    )
};
