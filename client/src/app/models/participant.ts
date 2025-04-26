export interface Participant {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    tel: number;
    structure?: any;
    profil?: any;
    formations?: any[];
} 