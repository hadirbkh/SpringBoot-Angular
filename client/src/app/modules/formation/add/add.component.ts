import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Domaine } from 'src/app/models/domaine';
import { Formation } from 'src/app/models/formation';
import { FormationService } from '../../../services/formation.service';
import { DomaineService } from './../../../services/domaine.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);
  hide = true;
  formation : Formation = {
    titre: "",
    annee: 0,
    duree: 0,
    capaciteMax: 0,
    budget: 0,
    domaine : null
  } as Formation;
  domainesList! : Domaine[]
  constructor(private formationService: FormationService, private domaineService : DomaineService) {}


  ngOnInit(){
    this.domaineService.domaines$.subscribe(
      (domaines)=>this.domainesList = domaines
    )
  }

  submit(){
    this.formationService.createFormation(this.formation).subscribe((data: Formation) => {
      this.formation = data;
      console.log(data);
    });  }


}
