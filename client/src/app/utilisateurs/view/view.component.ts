import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  userDetails!: Utilisateur;

  constructor(
    private utilisateurService: UtilisateursService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id']; // Get the ID from route parameters
      this.loadUserDetails(userId);
    });
  }

  loadUserDetails(userId: number): void {
    this.utilisateurService.getUserById(userId).subscribe({
      next: (data: Utilisateur) => {
        this.userDetails = data;
      },
      error: (err) => {
        console.error('Error loading user details:', err);
      }
    });
  }
}