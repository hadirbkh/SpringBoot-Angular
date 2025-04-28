import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'tel', 'type', 'employeur', 'actions'];
  dataSource: MatTableDataSource<any>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  loadFormateurs() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/formateur`).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading formateurs:', error);
        this.snackBar.open('Erreur lors du chargement des formateurs', 'Fermer', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editFormateur(id: number) {
    this.router.navigate(['/formateurs/edit', id]);
  }

  deleteFormateur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
      this.http.delete(`${environment.apiUrl}/formateur/${id}`).subscribe({
        next: () => {
          this.snackBar.open('Formateur supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.loadFormateurs();
        },
        error: (error) => {
          console.error('Error deleting formateur:', error);
          this.snackBar.open('Erreur lors de la suppression du formateur', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }
} 