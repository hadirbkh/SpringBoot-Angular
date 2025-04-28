import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Domaine } from 'src/app/models/domaine';
import { Formation } from 'src/app/models/formation';
import { DomaineService } from 'src/app/services/domaine.service';
import { FormationService } from '.././../../services/formation.service';

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
    domaine : null
  } as Formation;

  domainesList! : Domaine[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: Formation,private formationService: FormationService , private domaineService : DomaineService) {}

  ngOnInit() {
    this.formation={...this.data};
    this.domaineService.domaines$.subscribe(
      (domaines)=>this.domainesList = domaines
    )
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
