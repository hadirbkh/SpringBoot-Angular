import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Domaine } from 'src/app/models/domaine';
import { FormationService } from '../../../services/formation.service';
import { DomaineService } from 'src/app/services/domaine.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);
  hide = true;
  domaine : Domaine = {
    libelle: "",
  } as Domaine;
  constructor(private domaineService: DomaineService) {}



  submit(){
    this.domaineService.createDomaine(this.domaine).subscribe((data: Domaine) => {
      this.domaine = data;
    });  }


}
