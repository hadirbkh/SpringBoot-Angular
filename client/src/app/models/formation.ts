export interface Formation {
    id:number;
    titre: string;
    annee: number;
    duree: number;
    budget: number;
    domaine: {
        id: 1,
        libelle: "informatique"
    };
    participants: string[];
    capaciteMax: number;
}