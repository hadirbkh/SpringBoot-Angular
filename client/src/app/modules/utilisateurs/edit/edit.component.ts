import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/roles';
import { Utilisateur } from 'src/app/models/utilisateur';
import { RolesService } from 'src/app/services/roles.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  hide = true;
  utilisateur : Utilisateur={login:'',password:'',role:{}}as Utilisateur;
  rolesList ! : Role[]

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: Utilisateur,
              private utilisateurService: UtilisateursService,
              private rolesService : RolesService
            ) {}

  ngOnInit() {
    this.utilisateur={...this.data,password:''}; // The utilisateur object
    this.rolesService.roles$.subscribe(
      (roles)=>this.rolesList = roles
    )
  }

  clickEvent(event: MouseEvent) {
    this.hide=!this.hide;
    event.stopPropagation();
  }

  submitUser(){
    this.utilisateurService.updateUser(this.utilisateur).subscribe((data: Utilisateur) => {
      this.utilisateur = data;
      console.log(data);
    });  }

}
