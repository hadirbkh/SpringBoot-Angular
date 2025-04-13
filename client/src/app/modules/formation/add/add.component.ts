import { FormationService } from '../../../services/formation.service';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Formation } from 'src/app/models/formation';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);
  hide = true;
  formation : Formation = {
    titre: "",
    annee: 0,
    duree: 0,
    budget: 0,
  } as Formation;
  constructor(private formationService: FormationService) {}



  submitUser(){
    this.formationService.createFormation(this.formation).subscribe((data: Formation) => {
      this.formation = data;
      console.log(data);
    });  }


}
