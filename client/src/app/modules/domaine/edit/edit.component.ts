import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Domaine } from 'src/app/models/domaine';
import { DomaineService } from 'src/app/services/domaine.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  hide = true;
  domaine : Domaine = {
    libelle: "",
  } as Domaine;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Domaine,private domaineService: DomaineService) {}

  ngOnInit() {
    this.domaine={...this.data};
  }

  clickEvent(event: MouseEvent) {
    this.hide=!this.hide;
    event.stopPropagation();
  }

  submit(){
    this.domaineService.updateDomaine(this.domaine).subscribe((data: Domaine) => {
      this.domaine = data;
    });  }

}
