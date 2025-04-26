import { ParticipantService } from './../../services/participant.service';
import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { Participant } from '../../models/participant';

@Component({
  selector: 'app-participants',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {
  participants: Participant[] = [];
  dataSource = new MatTableDataSource(this.participants);
  selection = new SelectionModel(true, []);
  displayColumns = ['select', 'nom', 'prenom', 'email', 'tel', 'actions'];
  isDeleting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private participantService: ParticipantService,
    private snackBar: MatSnackBar
  ) {
    this.participantService.participants$.subscribe(participants => {
      this.participants = participants;
      this.dataSource.data = this.participants;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SelectHandler(row: Participant) {
    this.selection.toggle(row as never);
  }

  handleDelete(id: number) {
    if (this.isDeleting) return;

    if (confirm("Êtes-vous sûr de vouloir supprimer ce Participant ?")) {
      this.isDeleting = true;
      this.participantService.deleteParticipant(id).subscribe({
        next: () => {
          this.showSuccess('Participant supprimé avec succès');
          this.isDeleting = false;
        },
        error: (err) => {
          console.log(err.status)
          if (err.status >= 200 && err.status < 300) {
            this.showSuccess('Participant supprimé avec succès');
            this.isDeleting = false;
          } else {
            console.error('Erreur lors de la suppression:', err);
            this.showError('Erreur lors de la suppression');
            this.isDeleting = false;
          }
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
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.participantService.loadParticipants();
      }
    });
  }

  openUpdateDialog(participant: Participant): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
      data: participant
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.participantService.loadParticipants();
      }
    });
  }
} 