import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProfilService } from '../../services/profil.service';
import { Profil } from '../../models/profil';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  profils: Profil[] = [];
  dataSource = new MatTableDataSource<Profil>(this.profils);
  selection = new SelectionModel<Profil>(true, []);
  displayColumns = ['select', 'libelle', 'actions'];
  isDeleting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private profilService: ProfilService,
    private snackBar: MatSnackBar
  ) {
    this.profilService.profils$.subscribe(profils => {
      this.profils = profils;
      this.dataSource.data = this.profils;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SelectHandler(row: Profil) {
    this.selection.toggle(row);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  handleDelete(id: number) {
    if (this.isDeleting) return;

    if (confirm("Êtes-vous sûr de vouloir supprimer ce Profil ?")) {
      this.isDeleting = true;
      this.profilService.deleteProfil(id).subscribe({
        next: () => {
          this.showSuccess('Profil supprimé avec succès');
          this.isDeleting = false;
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.showError('Erreur lors de la suppression');
          this.isDeleting = false;
        }
      });
    }
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'top',
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
    // Implement add dialog
  }

  openUpdateDialog(profil: Profil): void {
    // Implement edit dialog
  }
} 