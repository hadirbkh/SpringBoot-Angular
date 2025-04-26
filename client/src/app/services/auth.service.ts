import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/auth';
import { UtilisateursService } from './utilisateurs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/api/login";


  loggedUser = new BehaviorSubject<Utilisateur|undefined>(undefined);
  loggedUser$ = this.loggedUser.asObservable();

  token = new BehaviorSubject<string|undefined>(undefined);
  token$ = this.loggedUser.asObservable();

  constructor(private httpClient: HttpClient , private utilisateursService : UtilisateursService){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.loggedUser.next(userObj);
    }
  }

  login(user:Utilisateur){
      return this.httpClient.post<TokenResponse>(this.apiUrl,user)
  }

  setToken(token : string){
    localStorage.setItem('token', token);
    this.token.next(token)
  }

  getUser(userParam:Utilisateur){
    this.utilisateursService.getUserByLogin(userParam.login).subscribe(
      (user:Utilisateur)=>{
        const safeUser = {...user,password:""}
        this.loggedUser.next(safeUser)
        localStorage.setItem('user', JSON.stringify(safeUser));
      }
    )
  }

  logout(){
    this.loggedUser.next(undefined)
    localStorage.removeItem('user');
    this.token.next(undefined)
    localStorage.removeItem('token');

  }


  get currentUser(): Utilisateur | undefined {
    return this.loggedUser.value;
  }

}
