import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Formateur } from '../../../entities/formateur';
import { FormateurService } from '../../../services/formateur/formateur.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-allformateur',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './allformateur.component.html',
  styleUrl: './allformateur.component.css'
})
export class AllformateurComponent implements OnInit {
  formateurs: Formateur[] = [];
 // <-- Declare formateur property

  isLoading = true;
  errorMessage = '';
  formateurIdToDelete: number | null = null; 

  constructor(private formateurService: FormateurService,    private modalService: ModalService


  ) {}
  
  ngOnInit(): void {
    this.getFormateurs();
  }

  getFormateurs() {
    this.formateurService.getAllFormateurs().subscribe({
      next: (data) => {
        console.log('✅ Données reçues:', data);
        this.formateurs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(' Erreur complète:', err);
        this.errorMessage = err.error?.message || 'Erreur serveur';
        this.isLoading = false;
      },
      complete: () => console.log('✅ Chargement terminé')
    });
  }

  deleteFormateur(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce formateur ?')) {
      this.formateurService.deleteFormateur(id).subscribe({
        next: () => {
          console.log(` Formateur ${id} supprimé`);
          // Soit recharger tout :
          this.getFormateurs();
          // Soit enlever localement sans appel serveur :
        },
        error: (err) => {
          console.error('Erreur de suppression:', err);
          this.errorMessage = err.error?.message || 'Erreur lors de la suppression';
        }
      });
    }
  }

  prepareDelete(id: number) {
    this.formateurIdToDelete = id;
  }

  confirmDelete() {
    if (this.formateurIdToDelete !== null) {
      this.formateurService.deleteFormateur(this.formateurIdToDelete).subscribe({
        next: () => {
          this.formateurs = this.formateurs.filter(p => p.id !== this.formateurIdToDelete);
          this.formateurIdToDelete = null; // Réinitialiser l'ID
          //$('#deleteEmployeeModal').modal('hide'); // Cacher la modale après suppression
        },
        error: (err) => {
          this.errorMessage = 'Erreur de suppression';
        }
      });
    }
  }

  addFormateur(formateur: Formateur) {
    this.formateurService.addFormateur(formateur).subscribe({
      next: (data) => {
        console.log('Formateur ajouté:', data);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout:', err);
      }
    });
  }

  // Mettre à jour un formateur
  updateFormateur(id: number, formateur: Formateur) {
    this.formateurService.updateFormateur(id, formateur).subscribe({
      next: (data) => {
        console.log('Formateur mis à jour:', data);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
      }
    });
  
}
handleAdd(formateur: any) {
  this.formateurService.addFormateur
  (formateur).subscribe(() => this.getFormateurs());
}

handleUpdate(formateur: any) {
  this.formateurService.updateFormateur
  (formateur.id, formateur).subscribe(() => this.getFormateurs());
}

handleDelete(id: number) {
  this.formateurService.deleteFormateur
  (id).subscribe(() => this.getFormateurs());
}
}
