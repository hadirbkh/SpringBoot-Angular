import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-delete',
  template: `<p>Suppression en cours…</p>`,
  styles: []
})
export class DeleteComponent implements OnInit {
  private userId!: number;

  constructor(
    private utilisateurService: UtilisateursService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) Read and coerce the 'id' param to a number
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      alert('Aucun ID d’utilisateur fourni.');
      this.router.navigate(['/users']);
      return;
    }
    this.userId = +idParam;

    // 2) Delete immediately
    this.utilisateurService.deleteUtilisateur(this.userId).subscribe({
      next: () => {
        // 3) One alert, then navigate
        alert('Utilisateur supprimé avec succès !');  
        this.router.navigate(['/users']);
      },
      error: err => {
        console.error('Erreur lors de la suppression :', err);
        alert('Impossible de supprimer l’utilisateur.');  
        this.router.navigate(['/users']);
      }
    });
  }
}
