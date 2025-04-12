import { Component, inject, ViewChild } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilisateursService } from '../services/utilisateurs.service';
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
      this.utilisateurService.utilisateurs$.subscribe(users => {
        this.utilisateur= users;
        this.dataSource.data = this.utilisateur;
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

  SelectHandler(row: Utilisateur) {
    this.selection.toggle(row as never);
  }

  handleDelete(id: number) {
    if (this.isDeleting) return;
    
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.isDeleting = true;
      this.utilisateurService.deleteUtilisateur(id).subscribe({
        next: () => {
          this.showSuccess('Utilisateur supprimé avec succès');
          this.isDeleting=false;
        },
        error: (err) => {
          console.log(err.status)
          if (err.status >= 200 && err.status < 300) {
            this.showSuccess('Utilisateur supprimé avec succès');
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

  openUpdateDialog(utilisateur:Utilisateur): void {
    this.dialog.open(EditComponent, {
      width: '500px',
      enterAnimationDuration:0,
      exitAnimationDuration:0,
      data: utilisateur
    });
  }

}