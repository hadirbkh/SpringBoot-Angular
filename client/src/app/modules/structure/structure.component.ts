import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { StructureService } from '../../services/structure.service';
import { Structure } from '../../models/structure';

@Component({
  selector: 'app-structures',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent {
  structures: Structure[] = [];
  dataSource = new MatTableDataSource(this.structures);
  selection = new SelectionModel(true, []);
  displayColumns = ['select', 'libelle', 'actions'];
  isDeleting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private structureService: StructureService,
    private snackBar: MatSnackBar
  ) {
    this.structureService.structures$.subscribe(structures => {
      this.structures = structures;
      this.dataSource.data = this.structures;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SelectHandler(row: Structure) {
    this.selection.toggle(row as never);
  }

  handleDelete(id: number) {
    if (this.isDeleting) return;

    if (confirm("Êtes-vous sûr de vouloir supprimer cette Structure ?")) {
      this.isDeleting = true;
      this.structureService.deleteStructure(id).subscribe({
        next: () => {
          this.showSuccess('Structure supprimée avec succès');
          this.isDeleting = false;
        },
        error: (err) => {
          if (err.status >= 200 && err.status < 300) {
            this.showSuccess('Structure supprimée avec succès');
          } else {
            console.error('Erreur lors de la suppression:', err);
            this.showError('Erreur lors de la suppression');
          }
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
    this.dialog.open(AddComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openUpdateDialog(structure: Structure): void {
    this.dialog.open(EditComponent, {
      width: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: structure
    });
  }
} 