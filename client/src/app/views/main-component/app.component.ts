import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  sidebarOpen=true;
  loggedUser! : Utilisateur|undefined

  constructor(private authService : AuthService){ }

  ngOnInit(): void {
      this.authService.loggedUser$.subscribe(
        (user)=>{
          this.loggedUser = user
        }
      )
  }

  toggleSidebar(){
    this.sidebarOpen=this.sidebarOpen? false:true;
  }

  logout(){
    window.location.href = '';
    this.authService.logout()

  }

}
