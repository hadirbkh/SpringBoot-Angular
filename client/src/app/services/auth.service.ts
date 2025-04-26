import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser = new BehaviorSubject<Utilisateur|undefined>(undefined);
  loggedUser$ = this.loggedUser.asObservable();

  constructor(){
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.loggedUser.next(userObj);
    }
  }

  login(user:Utilisateur){
    this.loggedUser.next(user)
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(){
    this.loggedUser.next(undefined)
    localStorage.removeItem('user');

  }


  get currentUser(): Utilisateur | undefined {
    return this.loggedUser.value;
  }

}
