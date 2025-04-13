import { Domaine } from "./domaine";

export interface Formation {
  id:string;
  titre: string;
  annee: number;
  duree: number;
  budget: number;
  domaine: Domaine;
  participants: string[];
  capaciteMax: number
}
