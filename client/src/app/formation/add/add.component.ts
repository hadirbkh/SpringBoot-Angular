import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);  
  hide = true;
  utilisateur : Utilisateur={login:'',password:'',role:{id:3}}as Utilisateur;
  constructor(private utilisateurService: UtilisateursService) {}
  
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
