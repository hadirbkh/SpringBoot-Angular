import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  hide = true;
  profil: Profil = {
    libelle: ""
  } as Profil;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Profil,
    private profilService: ProfilService
  ) {}

  ngOnInit() {
    this.profil = {...this.data};
  }

  submit() {
    if (this.profil.id) {
      this.profilService.updateProfil(this.profil.id, this.profil).subscribe((data: Profil) => {
        this.profil = data;
        console.log(data);
      });
    }
  }
} 