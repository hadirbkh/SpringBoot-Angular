import { Component, inject, ViewChild } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FormationService } from '../../services/formation.service';
import { Formation } from '../../models/formation';

@Component({
  selector: 'app-domaines',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent {
  formations: Formation[] = [];
  dataSource = new MatTableDataSource(this.formations);
  selection = new SelectionModel(true, []);
  displayColumns = ['select', 'titre','annee','duree','budget','domaine','actions'];
  isDeleting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private utilisateurService: FormationService,
    private snackBar: MatSnackBar
  ) {
      this.utilisateurService.formations$.subscribe(formations => {
        this.formations= formations;
        this.dataSource.data = this.formations;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 /* loadUsers() {
    this.utilisateurService.getUsers().subscribe((data: Utilisateur[]) => {
      this.utilisateur = data;
      this.dataSource.data = this.utilisateur;
    });
  }
  */

  SelectHandler(row: Formation) {
    this.selection.toggle(row as never);
  }

  handleDelete(id: number) {
    if (this.isDeleting) return;

    if (confirm("Êtes-vous sûr de vouloir supprimer cet formation ?")) {
      this.isDeleting = true;
      this.utilisateurService.deleteFormation(id).subscribe({
        next: () => {
          this.showSuccess('Formation supprimé avec succès');
          this.isDeleting=false;
        },
        error: (err) => {
          console.log(err.status)
          if (err.status >= 200 && err.status < 300) {
            this.showSuccess('Formation supprimé avec succès');
            this.isDeleting=false;

          } else {
            console.error('Erreur lors de la suppression:', err);
            this.showError('Erreur lors de la suppression');
            this.isDeleting=false;

          }
        }
      });
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

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openUpdateDialog(formation:Formation): void {
    this.dialog.open(EditComponent, {
      width: '500px',
      enterAnimationDuration:0,
      exitAnimationDuration:0,
      data: formation
    });
  }

}
