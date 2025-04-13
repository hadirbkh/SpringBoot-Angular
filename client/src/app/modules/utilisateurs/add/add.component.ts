import { RolesService } from './../../../services/roles.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/roles';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);
  hide = true;
  utilisateur : Utilisateur={login:'',password:'',role:{}}as Utilisateur;
  rolesList ! : Role[]
  constructor(private utilisateurService: UtilisateursService, private rolesService : RolesService ) {}

  ngOnInit(){
    this.rolesService.roles$.subscribe(
      (roles)=>this.rolesList = roles
    )
  }

  clickEvent(event: MouseEvent) {
    this.hide=!this.hide;
    event.stopPropagation();
  }

  submitUser(){
    this.utilisateurService.createUser(this.utilisateur).subscribe((data: Utilisateur) => {
      this.utilisateur = data;
      console.log(data);
    });  }


}
