import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Participant } from '../../../models/participant';
import { ParticipantService } from '../../../services/participant.service';
import { FormationService } from '../../../services/formation.service';
import { StructureService } from '../../../services/structure.service';
import { ProfilService } from '../../../services/profil.service';
import { Formation } from '../../../models/formation';
import { Structure } from '../../../models/structure';
import { Profil } from '../../../models/profil';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  readonly dialogRef = inject(MatDialogRef<AddComponent>);
  formations: Formation[] = [];
  structures: Structure[] = [];
  profils: Profil[] = [];
  selectedFormations: number[] = [];
  selectedStructure: number | null = null;
  selectedProfil: number | null = null;
  isSubmitting = false;
  
  participant: Participant = {
    nom: "",
    prenom: "",
    email: "",
    tel: 0,
    formations: [],
    structure: null,
    profil: null
  } as Participant;

  constructor(
    private participantService: ParticipantService,
    private formationService: FormationService,
    private structureService: StructureService,
    private profilService: ProfilService,
    private snackBar: MatSnackBar
  ) {
    this.loadFormations();
    this.loadStructures();
    this.loadProfils();
  }

  loadFormations() {
    this.formationService.formations$.subscribe(
      (formations: Formation[]) => {
        this.formations = formations;
      }
    );
  }

  loadStructures() {
    this.structureService.structures$.subscribe(
      (structures: Structure[]) => {
        this.structures = structures;
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

    if (!this.selectedStructure) {
        this.showError('Veuillez sélectionner une structure');
        this.isSubmitting = false;
        return;
    }

    if (!this.selectedProfil) {
        this.showError('Veuillez sélectionner un profil');
        this.isSubmitting = false;
        return;
    }

    // Set the structure and profil in the participant object
    this.participant.structure = { id: this.selectedStructure } as Structure;
    this.participant.profil = { id: this.selectedProfil } as Profil;

    // Create the participant
    this.participantService.createParticipant(this.participant).subscribe({
        next: (data: Participant) => {
            // Handle formations if selected
            if (this.selectedFormations.length > 0) {
              console.log('Selected formations:', this.selectedFormations);
                this.participantService.inscrireParticipantAuxFormations(data.id!, this.selectedFormations).subscribe({
                    next: () => {
                        this.showSuccess('Participant créé et inscrit aux formations avec succès');
                        this.dialogRef.close(true);
                    },
                    error: (err) => {
                        console.error('Error assigning formations:', err);
                        this.showError('Erreur lors de l\'inscription aux formations');
                        this.dialogRef.close(false);
                    }
                });
            } else {
                this.showSuccess('Participant créé avec succès');
                this.dialogRef.close(true);
            }
        },
        error: (err) => {
            console.error('Error creating participant:', err);
            this.showError('Erreur lors de la création du participant');
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