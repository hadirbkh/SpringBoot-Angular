import { Role } from "./roles";

export interface Utilisateur {
    id:number;
    login:string;
    password:string;
    role:Role;
}
