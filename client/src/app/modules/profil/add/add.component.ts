import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);
  hide = true;
  profil: Profil = {
    libelle: ""
  } as Profil;

  constructor(private profilService: ProfilService) {}

  submit() {
    this.profilService.createProfil(this.profil).subscribe((data: Profil) => {
      this.profil = data;
      console.log(data);
    });
  }
} 