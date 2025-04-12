import { Component, ViewChild } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilisateursService } from '../services/utilisateurs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent {
  utilisateur: Utilisateur[] = [];
  dataSource = new MatTableDataSource(this.utilisateur);
  selection = new SelectionModel(true, []);
  displayColumns = ["select", "name", "login", "Actions"];
  isDeleting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private utilisateurService: UtilisateursService,
    private snackBar: MatSnackBar
  ) {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this.utilisateurService.getUsers().subscribe((data: Utilisateur[]) => {
      this.utilisateur = data;
      this.dataSource.data = this.utilisateur;
    });
  }

  SelectHandler(row: Utilisateur) {
    this.selection.toggle(row as never);
  }

  handleDelete(id: number) {
    if (this.isDeleting) return;
    
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.isDeleting = true;
      this.utilisateurService.deleteUtilisateur(id).subscribe({
        next: () => {
          this.handleSuccessfulDelete(id);
          this.showSuccess('Utilisateur supprimé avec succès');
        },
        error: (err) => {
          if (err.status >= 200 && err.status < 300) {
            this.handleSuccessfulDelete(id);
            this.showSuccess('Utilisateur supprimé avec succès');
          } else {
            console.error('Erreur lors de la suppression:', err);
            this.showError('Erreur lors de la suppression');
          }
        },
        complete: () => {
          this.isDeleting = false;
        }
      });
    }
  }

  private handleSuccessfulDelete(id: number) {
    const index = this.utilisateur.findIndex(user => user.id === id);
    if (index > -1) {
      this.utilisateur.splice(index, 1);
      this.dataSource.data = [...this.utilisateur];
    }
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'top',    // Optional: position at top
      horizontalPosition: 'center'
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}