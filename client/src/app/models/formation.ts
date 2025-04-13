import { Domaine } from "./domaine";

export interface Formation {
  titre: string;
  annee: number;
  duree: number;
  budget: number;
  domaine: Domaine;
  participants: string[];
  capaciteMax: number
}
