import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, ViewChild } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateursService } from '../../services/utilisateurs.service';
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
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'role': return item.role?.nom || ""
        default: return item[property as keyof Utilisateur] as string|number;
      }
    };

    this.dataSource.filterPredicate = (data: Utilisateur, filter: string) => {
      const dataStr = (data.login + ' ' + (data.role?.nom || '')).toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
