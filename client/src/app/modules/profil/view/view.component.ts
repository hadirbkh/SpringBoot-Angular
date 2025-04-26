import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profil } from 'src/app/models/profil';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  profilDetails: Profil | null = null;

  constructor(
    private route: ActivatedRoute,
    private profilService: ProfilService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profilService.getProfilById(+id).subscribe((profil: Profil) => {
        this.profilDetails = profil;
      });
    }
  }
}
