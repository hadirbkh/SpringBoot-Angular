import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ParticipantService } from '../../../services/participant/participant.service';
import { CommonModule } from '@angular/common';
import { Participant } from '../../../entities/participant';

@Component({
  selector: 'app-allparticipant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './allparticipant.component.html',
  styleUrl: './allparticipant.component.css'
})
export class AllparticipantComponent implements OnInit {
  participants: Participant[] = [];
  isLoading = true;
  errorMessage = '';
  participantIdToDelete: number | null = null; // Identifiant du participant à supprimer

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.getParticipants();
  }

  getParticipants() {
    this.participantService.getAllParticipants().subscribe({
      next: (data) => {
        console.log('✅ Données reçues:', data);
        this.participants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erreur complète:', err);
        this.errorMessage = err.error?.message || 'Erreur serveur';
        this.isLoading = false;
      },
      complete: () => console.log('✅ Chargement terminé')
    });
  }

  deleteParticipant(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce participant ?')) {
      this.participantService.deleteParticipant(id).subscribe({
        next: () => {
          console.log(`✅ Participant ${id} supprimé`);
          // Soit recharger tout :
          this.getParticipants();
          // Soit enlever localement sans appel serveur :
          // this.participants = this.participants.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('❌ Erreur de suppression:', err);
          this.errorMessage = err.error?.message || 'Erreur lors de la suppression';
        }
      });
    }
  }

  prepareDelete(id: number) {
    this.participantIdToDelete = id;
  }

  // Confirmer la suppression et appeler le service pour supprimer le participant
  confirmDelete() {
    if (this.participantIdToDelete !== null) {
      this.participantService.deleteParticipant(this.participantIdToDelete).subscribe({
        next: () => {
          // Suppression locale du participant dans la liste
          this.participants = this.participants.filter(p => p.id !== this.participantIdToDelete);
          this.participantIdToDelete = null; // Réinitialiser l'ID
          //$('#deleteEmployeeModal').modal('hide'); // Cacher la modale après suppression
        },
        error: (err) => {
          this.errorMessage = 'Erreur de suppression';
        }
      });
    }
  }

  // Mettre à jour un formateur
  updateParticipant(id: number, participant: Participant) {
    this.participantService.updateParticipant(id, participant).subscribe({
      next: (data) => {
        console.log('Participant mis à jour:', data);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
      }
    });
  }
}
