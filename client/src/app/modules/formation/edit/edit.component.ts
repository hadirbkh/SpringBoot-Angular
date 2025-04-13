import { FormationService } from '.././../../services/formation.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Formation } from 'src/app/models/formation';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  hide = true;
  formation : Formation = {
    titre: "",
    annee: 0,
    duree: 0,
    budget: 0,
  } as Formation;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Formation,private formationService: FormationService) {}

  ngOnInit() {
    this.formation=this.data;
  }

  clickEvent(event: MouseEvent) {
    this.hide=!this.hide;
    event.stopPropagation();
  }

  submit(){
    this.formationService.updateFormation(this.formation).subscribe((data: Formation) => {
      this.formation = data;
      console.log(data);
    });  }

}
