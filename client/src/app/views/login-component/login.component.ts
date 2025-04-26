import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  hide = true;
  user : Utilisateur={
    login:'',
    password:'',
    role: {
      id:1,
      nom:"ADMIN"
    }
  } as Utilisateur;

  constructor(private authService : AuthService) { }

  clickEvent(event: MouseEvent) {
    this.hide=!this.hide;
    event.stopPropagation();
  }

  logUser (){
    this.authService.login(this.user)
  }


}
