import { Employeur } from "./employeur";


export class Formateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    tel: number;
    type: number;  // ou Structure si tu as une entité Structure séparée
    employeur: Employeur;     // ou Profil si tu as une entité Profil séparée
  
    // Tu peux ajouter un constructeur si nécessaire
    constructor(id: number, nom: string, prenom: string, email: string, tel: number, type:number, employeur:Employeur) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.tel = tel;
      this.type = type;
      this.employeur = employeur;
    }
  }
  