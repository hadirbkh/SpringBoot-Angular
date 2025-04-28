import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/models/formation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  formationDetails!: Formation;
  isLoading = true;

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const formationId = params['id']; // Get the ID from route parameters
      this.loadFormationDetails(formationId);
    });
  }

  loadFormationDetails(formationId: number): void {
    this.isLoading = true;
    this.formationService.getFormationById(formationId).subscribe({
      next: (data: Formation) => {
        this.formationDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading formation details:', err);
        this.showError('Erreur lors du chargement des détails de la formation');
        this.isLoading = false;
      }
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}