import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from '../../../models/participant';
import { ParticipantService } from '../../../services/participant.service';
import { FormationService } from '../../../services/formation.service';
import { ProfilService } from '../../../services/profil.service';
import { Formation } from '../../../models/formation';
import { Profil } from '../../../models/profil';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  formations: Formation[] = [];
  profils: Profil[] = [];
  selectedFormations: number[] = [];
  selectedProfil: number | null = null;
  isSubmitting = false;
  
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public participant: Participant,
    private participantService: ParticipantService,
    private formationService: FormationService,
    private profilService: ProfilService,
    private snackBar: MatSnackBar
  ) {
    this.loadFormations();
    this.loadProfils();
    if (participant.formations) {
      this.selectedFormations = participant.formations.map(f => f.id);
    }
    if (participant.profil) {
      this.selectedProfil = participant.profil.id;
    }
  }

  loadFormations() {
    this.formationService.formations$.subscribe(
      (formations: Formation[]) => {
        this.formations = formations;
      }
    );
  }

  loadProfils() {
    this.profilService.profils$.subscribe(
      (profils: Profil[]) => {
        this.profils = profils;
      }
    );
  }

  submit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    
    if (!this.selectedProfil) {
      this.showError('Veuillez sélectionner un profil');
      this.isSubmitting = false;
      return;
    }
    
    // Set the profil in the participant object
    this.participant.profil = { id: this.selectedProfil } as Profil;
    
    // Update the participant first
    this.participantService.updateParticipant(this.participant.id!, this.participant).subscribe({
      next: (data: Participant) => {
        // If formations are selected, assign them to the participant
        if (this.selectedFormations.length > 0) {
          this.participantService.inscrireParticipantAuxFormations(data.id!, this.selectedFormations).subscribe({
            next: () => {
              this.showSuccess('Participant mis à jour et inscrit aux formations avec succès');
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.error('Error assigning formations:', err);
              this.showError('Erreur lors de l\'inscription aux formations');
              this.dialogRef.close(false);
            }
          });
        } else {
          this.showSuccess('Participant mis à jour avec succès');
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        console.error('Error updating participant:', err);
        this.showError('Erreur lors de la mise à jour du participant');
        this.isSubmitting = false;
      }
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
} 