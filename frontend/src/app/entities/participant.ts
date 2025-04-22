import { Profil } from "./profil";
import { Structure } from "./structure";

export class Participant {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    tel: number;
    structure: Structure;  // ou Structure si tu as une entité Structure séparée
    profil: Profil;     // ou Profil si tu as une entité Profil séparée
  
    // Tu peux ajouter un constructeur si nécessaire
    constructor(id: number, nom: string, prenom: string, email: string, tel: number, structure: Structure, profil: Profil) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.tel = tel;
      this.structure = structure;
      this.profil = profil;
    }
  }
  