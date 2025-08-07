export enum RatingCategory {
  Planning = 1,
  Personaltrait = 2,
  Knowledge = 3,
  Sellingskills = 4,
}

export interface IRating {
  ClinicVisitId: number;
  type: number;
  title: string;
  rateeId: Number | null;
  ratingScores: IRatingScore[];
  recommendation: string;
  notes: string;
}

export interface IRatingScore {
  category: RatingCategory;
  score: number;
}

export interface IQuestion {
  title: string;
  section: string;
  points: number;
}

